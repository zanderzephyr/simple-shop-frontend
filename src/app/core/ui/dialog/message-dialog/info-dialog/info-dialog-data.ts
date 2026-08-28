import { MessageDialogData } from '@app/core/ui/dialog/message-dialog/message-dialog-data';
import { InfoDialogComponent } from './info-dialog';

export class InfoDialogData extends MessageDialogData<InfoDialogComponent> {
	public constructor(message: string, title?: string) {
		super(message, title ?? 'Info', InfoDialogComponent);
	}
}
