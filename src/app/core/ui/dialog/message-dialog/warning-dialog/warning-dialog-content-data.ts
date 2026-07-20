import { MessageDialogData } from '@app/core/ui/dialog/message-dialog/message-dialog-data';
import { WarningDialogComponent } from './warning-dialog';

export class WarningDialogContentData extends MessageDialogData<WarningDialogComponent> {
  public constructor(message: string, title?: string) {
    super(message, title ?? 'Warning', WarningDialogComponent);
  }
}
