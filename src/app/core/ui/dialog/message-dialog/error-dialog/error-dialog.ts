import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonConfiguration } from '@ui/button/button-configuration';
import { MessageDialogComponent } from '@ui/dialog/message-dialog/message-dialog';

@Component({
  selector: 'app-error-dialog',
  imports: [MatIconModule],
  templateUrl: './error-dialog.html',
  styleUrl: './error-dialog.css',
})
export class ErrorDialogComponent extends MessageDialogComponent<ErrorDialogComponent> {
  public constructor() {
    super();
  }

  public override createButtonConfigurations(): ButtonConfiguration[] {
    return [this.getConfirmButtonConfiguration()];
  }
}
