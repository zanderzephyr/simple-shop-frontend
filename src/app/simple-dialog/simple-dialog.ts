import { Component } from '@angular/core';
import { DialogContentComponent } from '@ui/dialog/interface/dialog-content';

// TODO Remove this whole directory when dialogs work
@Component({
  selector: 'app-simple-dialog',
  imports: [],
  templateUrl: './simple-dialog.html',
  styleUrl: './simple-dialog.css',
})
export class SimpleDialogComponent extends DialogContentComponent<string, string> {
  public constructor() {
    super();

    console.log(this.getDialogContentData());
    setTimeout(() => console.log(this.getDialogReference()), 2000);
  }

  getResult(): string {
    return 'Hello!';
  }
}
