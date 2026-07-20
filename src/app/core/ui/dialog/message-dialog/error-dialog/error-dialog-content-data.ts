import { MessageDialogData } from '@app/core/ui/dialog/message-dialog/message-dialog-data';
import { ErrorDialogComponent } from './error-dialog';

export class ErrorDialogContentData extends MessageDialogData<ErrorDialogComponent> {
  public constructor(message: string, title?: string) {
    super(message, title ?? 'Error', ErrorDialogComponent);
  }
}
