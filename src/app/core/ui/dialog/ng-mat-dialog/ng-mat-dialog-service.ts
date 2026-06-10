import { DialogService } from '@ui/dialog/interface/dialog-service';
import { DialogData } from '@ui/dialog/interface/dialog-data';
import { DialogConfig } from '@ui/dialog/interface/dialog-config';
import { DialogReference } from '@ui/dialog/interface/dialog-reference';
import { DialogResult } from '@ui/dialog/interface/dialog-result';
import { DialogContent } from '@ui/dialog/interface/dialog-content';
import { mapToNgMatConfig as mapToNgMatDialogConfig } from './ng-mat-dialog-config-mapper';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NgMatDialogService extends DialogService {
  readonly #matDialog: MatDialog = inject(MatDialog);

  public constructor() {
    super();
  }

  public open<
    RESULT extends DialogResult,
    CONTENT extends DialogContent<RESULT>,
    DATA extends DialogData,
    CONFIG extends DialogConfig<CONTENT, DATA>,
  >(config: CONFIG): DialogReference<RESULT> {
    const ngMatDialogConfig: MatDialogConfig<DATA> = mapToNgMatDialogConfig(config);

    const rawDialogReference: MatDialogRef<CONTENT, RESULT> = this.#matDialog.open<
      CONTENT,
      DATA,
      RESULT
    >(config.getContentComponentType(), ngMatDialogConfig);

    const wrappedDialogReference: NgMatDialogReference<RESULT, CONTENT> = new NgMatDialogReference<
      RESULT,
      CONTENT
    >(rawDialogReference);

    return wrappedDialogReference;
  }
}

class NgMatDialogReference<
  RESULT extends DialogResult,
  CONTENT extends DialogContent<RESULT>,
> implements DialogReference<RESULT> {
  readonly #matDialogReference: MatDialogRef<CONTENT, RESULT>;

  public constructor(matDialogReference: MatDialogRef<CONTENT, RESULT>) {
    this.#matDialogReference = matDialogReference;
  }

  public close(): Promise<RESULT | undefined> {
    const dialogResult: RESULT = this.#matDialogReference.componentInstance.createResult();
    this.#matDialogReference.close(dialogResult);
    return firstValueFrom<RESULT | undefined>(this.#matDialogReference.afterClosed());
  }
}
