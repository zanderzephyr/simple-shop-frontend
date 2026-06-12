import { Component } from '@angular/core';
import { DialogContent } from '@ui/dialog/interface/dialog-content';
import { DialogResult } from '@ui/dialog/interface/dialog-result';
import { DialogContentData } from '@app/core/ui/dialog/interface/dialog-content-data';

// TODO Remove this whole directory when dialogs work
@Component({
  selector: 'app-simple-dialog-component',
  imports: [],
  templateUrl: './simple-dialog-component.html',
  styleUrl: './simple-dialog-component.css',
})
export class SimpleDialogComponent extends DialogContent<
  SimpleDialogComponentDialogData,
  SimpleDialogComponentDialogResult
> {
  public readonly interfaceTag: 'dialogContent' = 'dialogContent';

  public constructor() {
    super();

    console.log(this.dialogContentData.getSomeData());
    console.log(this.getDialogReference());

    setTimeout(() => console.log(this.getDialogReference()), 2000);
  }

  getResult(): SimpleDialogComponentDialogResult {
    return new SimpleDialogComponentDialogResult();
  }
}

export class SimpleDialogComponentDialogResult implements DialogResult {
  public readonly interfaceTag: 'dialogResult' = 'dialogResult';

  public constructor() {}

  public getText(): string {
    return 'Hello!';
  }
}

export class SimpleDialogComponentDialogData implements DialogContentData {
  public readonly interfaceTag: 'dialogContentData' = 'dialogContentData';

  public constructor() {}

  public getSomeData(): string {
    return 'Some data';
  }
}
