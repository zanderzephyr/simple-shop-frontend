import { MessageDialogContentData } from '@ui/dialog/message-dialog/message-dialog-content-data';
import { WarningDialogComponent } from './warning-dialog';

export class WarningDialogContentData extends MessageDialogContentData<WarningDialogComponent> {
  public constructor(message: string, title?: string) {
    super(message, title ?? 'Warning', WarningDialogComponent);
  }
}
