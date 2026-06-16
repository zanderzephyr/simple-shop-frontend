import { MessageDialogContentData } from '@ui/dialog/message-dialog/message-dialog-content-data';
import { InfoDialogComponent } from './info-dialog';

export class InfoDialogContentData extends MessageDialogContentData<InfoDialogComponent> {
  public constructor(message: string, title?: string) {
    super(message, title ?? 'Info', InfoDialogComponent);
  }
}
