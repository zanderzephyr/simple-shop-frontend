import { DialogResult } from './dialog-result';
import { DialogReference } from './dialog-reference';
import { DialogContentData } from './dialog-content-data';
import { DIALOG_REFERENCE, DIALOG_DATA } from './dialog-tokens';
import { Directive, inject } from '@angular/core';

@Directive()
export abstract class DialogContent<DATA extends DialogContentData, RESULT extends DialogResult> {
  public readonly dialogReference: DialogReference<RESULT> = inject(DIALOG_REFERENCE);

  public readonly dialogContentData: DATA = inject(DIALOG_DATA) as DATA;

  public constructor() {}

  /**
   * If the dialog content component works with some kind of result, the result has to be created
   * before closing the dialog via the dialog reference of this dialog content component.
   *
   * This method returns the created result. It returns undefined instead if the dialog content
   * component doesn't use results or if the dialog content component is in any kind of invalid state
   * (e.g. when the result hasn't been properly created yet (default) or if e.g. the dialog content
   * component has a partially filled form with missing required data etc. ).
   */
  public abstract getResult(): RESULT | undefined;
}
