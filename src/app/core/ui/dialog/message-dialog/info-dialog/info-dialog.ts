import { Component, Signal, signal } from '@angular/core';
import { ButtonConfiguration } from '@ui/button/button-configuration';
import { MessageDialogComponent } from '@ui/dialog/message-dialog/message-dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-dialog',
  imports: [MatIconModule],
  templateUrl: './info-dialog.html',
  styleUrl: './info-dialog.css',
})
export class InfoDialogComponent extends MessageDialogComponent<InfoDialogComponent> {
  readonly #buttonConfigurations: Signal<ButtonConfiguration[]> = signal([
    this.getConfirmButtonConfiguration(),
  ]);

  public constructor() {
    super();
  }

  public override getButtonConfigurations(): Signal<ButtonConfiguration[]> {
    return this.#buttonConfigurations;
  }
}
