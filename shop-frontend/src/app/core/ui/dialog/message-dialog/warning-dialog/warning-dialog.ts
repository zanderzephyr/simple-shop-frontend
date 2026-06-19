import { Component, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonConfiguration } from '@ui/button/button-configuration';
import { MessageDialogComponent } from '@ui/dialog/message-dialog/message-dialog';

@Component({
  selector: 'app-warning-dialog',
  imports: [MatIconModule],
  templateUrl: './warning-dialog.html',
  styleUrl: './warning-dialog.css',
})
export class WarningDialogComponent extends MessageDialogComponent<WarningDialogComponent> {
  readonly #buttonConfigurations: Signal<ButtonConfiguration[]> = signal([
    this.getCancelButtonConfiguration(),
    this.getConfirmButtonConfiguration(),
  ]);

  public constructor() {
    super();
  }

  public override getButtonConfigurations(): Signal<ButtonConfiguration[]> {
    return this.#buttonConfigurations;
  }
}
