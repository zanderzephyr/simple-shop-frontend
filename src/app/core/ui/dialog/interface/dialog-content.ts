import { DialogReference } from './dialog-reference';
import { DIALOG_CONTENT_DATA } from './dialog-tokens';
import { Directive, inject } from '@angular/core';

@Directive()
export abstract class DialogContentComponent<DATA, RESULT> {
  readonly #dialogData: DATA = inject(DIALOG_CONTENT_DATA) as DATA;

  /**
   * This property is set after the dialog has been created.
   */
  #dialogReference: DialogReference<RESULT> | undefined;

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

  public setDialogReference(dialogReference: DialogReference<RESULT>): this {
    if (this.#dialogReference !== undefined) {
      throw new Error('The dialog reference must be only set once!');
    }
    this.#dialogReference = dialogReference;
    return this;
  }

  protected getDialogReference(): DialogReference<RESULT> {
    if (this.#dialogReference === undefined) {
      throw new Error('Lifecycle failure: Accessing the dialog reference before it is set!');
    }
    return this.#dialogReference;
  }

  protected getDialogData(): DATA {
    return this.#dialogData;
  }
}
