import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonConfiguration } from '@ui/button/button-configuration';
import { MessageDialogComponent } from '@ui/dialog/message-dialog/message-dialog';

@Component({
	selector: 'app-info-dialog',
	imports: [MatIconModule],
	templateUrl: './info-dialog.html',
	styleUrl: './info-dialog.scss'
})
export class InfoDialogComponent extends MessageDialogComponent<InfoDialogComponent> {
	public constructor() {
		super();
	}

	public override createButtonConfigurations(): ButtonConfiguration[] {
		return [this.getConfirmButtonConfiguration()];
	}
}
