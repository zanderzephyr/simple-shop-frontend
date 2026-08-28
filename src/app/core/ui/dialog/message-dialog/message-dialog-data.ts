import { signal, Signal, Type, WritableSignal } from '@angular/core';
import { GeneralDialogData } from '@ui/dialog/general-dialog/general-dialog-data';
import { MessageDialogComponent } from './message-dialog';
import { MessageDialogResult } from './message-dialog-result';

export class MessageDialogData<
	CONTENT_TYPE extends MessageDialogComponent<CONTENT_TYPE>,
> extends GeneralDialogData<MessageDialogData<CONTENT_TYPE>, MessageDialogResult, CONTENT_TYPE> {
	#message: WritableSignal<string>;

	public constructor(message: string, title: string, contentType: Type<CONTENT_TYPE>) {
		super(title, contentType);

		this.#message = signal(message);
	}

	public getMessage(): Signal<string> {
		return this.#message.asReadonly();
	}

	public setMessage(message: string): this {
		this.#message.set(message);

		return this;
	}
}
