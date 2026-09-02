import { MessageDialogData } from '@app/core/ui/dialog/message-dialog/message-dialog-data';
import { InfoDialogComponent } from './info-dialog';
import * as Keys from './info-dialog-utils';

export class InfoDialogData extends MessageDialogData<InfoDialogComponent> {
	public constructor(message: string, title?: string) {
		super(message, title ?? Keys.INFO_DIALOG_TITLE_KEY, InfoDialogComponent);
	}
}
