import { DialogResult } from './dialog-result';

export interface DialogContent<RESULT extends DialogResult> {
  readonly interfaceTag: 'dialogContent';

  /**
   * If the dialog content component works with some kind of result, the result has to be created
   * before closing the dialog via the dialog reference of this dialog content component.
   *
   * This method returns the created result. It returns undefined instead if the dialog content
   * component doesn't use results or if the dialog content component is in any kind of invalid state
   * (e.g. when the result hasn't been properly created yet (default) or if e.g. the dialog content
   * component has a partially filled form with missing required data etc. ).
   */
  getResult(): RESULT | undefined;
}
