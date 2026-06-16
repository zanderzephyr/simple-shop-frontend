import { MessageDialogResult } from './message-dialog-result';
import { MessageDialogComponent } from './message-dialog';
import { GeneralDialogContentData } from '@ui/dialog/general-dialog-content/general-dialog-content-data';
import { Type } from '@angular/core';

export class MessageDialogContentData<
  CONTENT_TYPE extends MessageDialogComponent<CONTENT_TYPE>,
> extends GeneralDialogContentData<
  MessageDialogContentData<CONTENT_TYPE>,
  MessageDialogResult,
  CONTENT_TYPE
> {
  readonly #message: string;

  public constructor(message: string, title: string, contentType: Type<CONTENT_TYPE>) {
    super(title, contentType);

    this.#message = message;
  }

  public getMessage(): string {
    return this.#message;
  }
}
