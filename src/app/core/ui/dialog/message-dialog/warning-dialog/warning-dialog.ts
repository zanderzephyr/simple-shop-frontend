import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MessageDialogComponent } from '@ui/dialog/message-dialog/message-dialog';

@Component({
  selector: 'app-warning-dialog',
  imports: [MatIconModule],
  templateUrl: './warning-dialog.html',
  styleUrl: './warning-dialog.css',
})
export class WarningDialogComponent extends MessageDialogComponent<WarningDialogComponent> {
  public constructor() {
    super();
  }
}
