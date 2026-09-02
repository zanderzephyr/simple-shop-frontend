import { MessageDialogData } from '@app/core/ui/dialog/message-dialog/message-dialog-data';
import { ErrorDialogComponent } from './error-dialog';
import * as Keys from './error-dialog-utils';

export class ErrorDialogData extends MessageDialogData<ErrorDialogComponent> {
	public constructor(message: string, title?: string) {
		super(message, title ?? Keys.ERROR_DIALOG_TITLE_KEY, ErrorDialogComponent);
	}
}
