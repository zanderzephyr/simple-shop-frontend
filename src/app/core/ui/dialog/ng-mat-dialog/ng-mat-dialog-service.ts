import { DialogService } from '@ui/dialog/interface/dialog-service';
import { DialogData } from '@ui/dialog/interface/dialog-data';
import { DialogConfig } from '@ui/dialog/interface/dialog-config';
import { DialogReference } from '@ui/dialog/interface/dialog-reference';
import { DialogResult } from '@ui/dialog/interface/dialog-result';
import { DialogContent } from '@ui/dialog/interface/dialog-content';
import { DIALOG_REFERENCE, DIALOG_DATA } from '@ui/dialog/interface/dialog-tokens';
import { mapToNgMatConfig as mapToNgMatDialogConfig } from './ng-mat-dialog-config-mapper';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { inject, Injectable, Injector } from '@angular/core';

@Injectable()
export class NgMatDialogService extends DialogService {
  readonly #matDialog: MatDialog = inject(MatDialog);

  readonly #parentInjector: Injector = inject(Injector);

  public constructor() {
    super();
  }

  public open<
    DATA extends DialogData,
    RESULT extends DialogResult,
    CONTENT extends DialogContent<RESULT>,
    CONFIG extends DialogConfig<CONTENT, DATA>,
  >(config: CONFIG): DialogReference<RESULT> {
    let wrappedDialogReference: NgMatDialogReference<RESULT, CONTENT>;

    const dynamicElementInjector: Injector = Injector.create({
      providers: [
        {
          provide: DIALOG_REFERENCE,
          // COMMENT: Use a factory hook function to resolve the handle lazily at class lookup time.
          useFactory: (): DialogReference<RESULT> => {
            return wrappedDialogReference;
          },
        },
        { provide: DIALOG_DATA, useValue: config.getDialogData() },
      ],
      parent: this.#parentInjector,
    });

    const ngMatDialogConfig: MatDialogConfig<DATA> = mapToNgMatDialogConfig(config);
    ngMatDialogConfig.injector = dynamicElementInjector;

    const rawDialogReference: MatDialogRef<CONTENT, RESULT> = this.#matDialog.open<
      CONTENT,
      DATA,
      RESULT
    >(config.getContentComponentType(), ngMatDialogConfig);

    wrappedDialogReference = new NgMatDialogReference<RESULT, CONTENT>(rawDialogReference);

    return wrappedDialogReference;
  }
}

class NgMatDialogReference<
  RESULT extends DialogResult,
  CONTENT extends DialogContent<RESULT>,
> implements DialogReference<RESULT> {
  public readonly interfaceTag: 'dialogReference' = 'dialogReference';

  readonly #matDialogReference: MatDialogRef<CONTENT, RESULT>;

  /*
		According to ECMAScript standard, only the first settling of a promise is actually performed.
		Therefore, we have not flags to prevent redundant resolves.
		See https://ecma-international.org/wp-content/uploads/ECMA-262_15th_edition_june_2024.pdf
		27.2 Promise Objects
	*/
  readonly #promiseAndResolvers: PromiseWithResolvers<RESULT | undefined>;

  public constructor(matDialogReference: MatDialogRef<CONTENT, RESULT>) {
    this.#matDialogReference = matDialogReference;
    this.#promiseAndResolvers = Promise.withResolvers<RESULT | undefined>();

    this.#init();
  }

  #init(): void {
    this.#matDialogReference.beforeClosed().subscribe(() => {
      const dialogResult: RESULT | undefined = this.#determineResult(true);
      this.#promiseAndResolvers.resolve(dialogResult);
    });
  }

  #determineResult(discardResult?: boolean): RESULT | undefined {
    const contentComponent: CONTENT = this.#matDialogReference.componentInstance;
    return discardResult ? undefined : contentComponent.getResult();
  }

  public getResult(): Promise<RESULT | undefined> {
    return this.#promiseAndResolvers.promise;
  }

  public close(discardResult?: boolean): Promise<void> {
    const dialogResult: RESULT | undefined = this.#determineResult(discardResult);

    this.#promiseAndResolvers.resolve(dialogResult);

    this.#matDialogReference.close(dialogResult);
    return Promise.resolve();
  }
}
