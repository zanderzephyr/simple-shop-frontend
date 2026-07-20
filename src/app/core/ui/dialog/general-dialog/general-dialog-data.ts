import { GeneralDialogContentComponent } from './general-dialog-content';
import { signal, Signal, Type, WritableSignal } from '@angular/core';

export abstract class GeneralDialogData<
  CHILD_DATA,
  CHILD_RESULT,
  CHILD_CONTENT_TYPE extends GeneralDialogContentComponent<CHILD_DATA, CHILD_RESULT>,
> {
  readonly #title: WritableSignal<string>;

  readonly #childContentType: Type<CHILD_CONTENT_TYPE>;

  public constructor(title: string, childContentType: Type<CHILD_CONTENT_TYPE>) {
    this.#title = signal(title);
    this.#childContentType = childContentType;
  }

  public getTitle(): Signal<string> {
    return this.#title.asReadonly();
  }

  public setTitle(title: string): this {
    this.#title.set(title);

    return this;
  }

  public getChildContentType(): Type<CHILD_CONTENT_TYPE> {
    return this.#childContentType;
  }
}
