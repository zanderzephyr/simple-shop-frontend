import { MessageDialogData } from '@app/core/ui/dialog/message-dialog/message-dialog-data';
import { WarningDialogComponent } from './warning-dialog';
import * as Keys from './warning-dialog-utils';

export class WarningDialogData extends MessageDialogData<WarningDialogComponent> {
	public constructor(message: string, title?: string) {
		super(message, title ?? Keys.WARNING_DIALOG_TITLE_KEY, WarningDialogComponent);
	}
}
