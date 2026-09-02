import { signal, Signal, Type, WritableSignal } from '@angular/core';
import { GeneralDialogContentComponent } from './general-dialog-content';

export abstract class GeneralDialogData<
	DATA,
	RESULT,
	CONTENT_TYPE extends GeneralDialogContentComponent<DATA, RESULT>,
> {
	readonly #title: WritableSignal<string>;

	readonly #childContentType: Type<CONTENT_TYPE>;

	protected constructor(title: string, childContentType: Type<CONTENT_TYPE>) {
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

	public getChildContentType(): Type<CONTENT_TYPE> {
		return this.#childContentType;
	}
}
