import { MessageDialogContentData } from '@ui/dialog/message-dialog/message-dialog-content-data';
import { ErrorDialogComponent } from './error-dialog';

export class ErrorDialogContentData extends MessageDialogContentData<ErrorDialogComponent> {
  public constructor(message: string, title?: string) {
    super(message, title ?? 'Error', ErrorDialogComponent);
  }
}
