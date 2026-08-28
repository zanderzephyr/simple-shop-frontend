import { MessageDialogData } from './message-dialog-data';
import { MessageDialogResult } from './message-dialog-result';
import { GeneralDialogContentComponent } from '@app/core/ui/dialog/general-dialog/general-dialog-content';
import { Directive } from '@angular/core';

@Directive()
export abstract class MessageDialogComponent<
	CONTENT_TYPE extends MessageDialogComponent<CONTENT_TYPE>,
> extends GeneralDialogContentComponent<MessageDialogData<CONTENT_TYPE>, MessageDialogResult> {
	public constructor() {
		super();
	}

	protected override onConfirm(): void {
		this.setResult(MessageDialogResult.CONFIRM);

		super.onConfirm();
	}

	protected override onCancel(): void {
		this.setResult(MessageDialogResult.CANCEL);

		super.onCancel();
	}
}
