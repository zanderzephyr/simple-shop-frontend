import { DialogService } from '@ui/dialog/interface/dialog-service';
import { DialogContentData } from '@app/core/ui/dialog/interface/dialog-content-data';
import { DialogConfig } from '@ui/dialog/interface/dialog-config';
import { DialogReference } from '@ui/dialog/interface/dialog-reference';
import { DialogResult } from '@ui/dialog/interface/dialog-result';
import { DialogContent } from '@ui/dialog/interface/dialog-content';
import { DIALOG_DATA } from '@ui/dialog/interface/dialog-tokens';
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
    DATA extends DialogContentData,
    RESULT extends DialogResult,
    CONTENT extends DialogContent<DATA, RESULT>,
    CONFIG extends DialogConfig<DATA, CONTENT>,
  >(config: CONFIG): DialogReference<RESULT> {
    const ngMatDialogConfig: MatDialogConfig<DATA> = mapToNgMatDialogConfig(config);
    /*
			We use DI to pass things into the dialog content component. An alternative would be,
			to have propper setters and getters on the dialog content component, which would
			lead to increased privacy / reduced property visibility, but also mutability and
			delayed data property availability in the dialog content component.
		*/
    ngMatDialogConfig.injector = this.#createInjector(config);

    const rawDialogReference: MatDialogRef<CONTENT, RESULT> = this.#matDialog.open<
      CONTENT,
      DATA,
      RESULT
    >(config.getContentComponentType(), ngMatDialogConfig);

    const dialogReference: NgMatDialogReference<DATA, RESULT, CONTENT> = new NgMatDialogReference<
      DATA,
      RESULT,
      CONTENT
    >(rawDialogReference);

    rawDialogReference.componentInstance.setDialogReference(dialogReference);

    return dialogReference;
  }

  #createInjector<
    DATA extends DialogContentData,
    RESULT extends DialogResult,
    CONTENT extends DialogContent<DATA, RESULT>,
    CONFIG extends DialogConfig<DATA, CONTENT>,
  >(config: CONFIG): Injector {
    return Injector.create({
      providers: [{ provide: DIALOG_DATA, useValue: config.getDialogContentData() }],
      parent: this.#parentInjector,
    });
  }
}

class NgMatDialogReference<
  DATA extends DialogContentData,
  RESULT extends DialogResult,
  CONTENT extends DialogContent<DATA, RESULT>,
> implements DialogReference<RESULT> {
  public readonly interfaceTag: 'dialogReference' = 'dialogReference';

  /*
		According to ECMAScript standard, only the first settling of a promise is actually performed.
		Therefore, we have not flags to prevent redundant resolves.
		See https://ecma-international.org/wp-content/uploads/ECMA-262_15th_edition_june_2024.pdf
		27.2 Promise Objects
	*/
  readonly #promiseAndResolvers: PromiseWithResolvers<RESULT | undefined>;

  readonly #matDialogReference: MatDialogRef<CONTENT, RESULT>;

  public constructor(dialogReference: MatDialogRef<CONTENT, RESULT>) {
    this.#promiseAndResolvers = Promise.withResolvers<RESULT | undefined>();
    this.#matDialogReference = dialogReference;

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
