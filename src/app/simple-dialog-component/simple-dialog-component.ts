import { Component } from '@angular/core';
import { DialogContent } from '@ui/dialog/interface/dialog-content';
import { DialogResult } from '@ui/dialog/interface/dialog-result';
import { DialogData } from '@ui/dialog/interface/dialog-data';

// TODO Remove this whole directory when dialogs work
@Component({
  selector: 'app-simple-dialog-component',
  imports: [],
  templateUrl: './simple-dialog-component.html',
  styleUrl: './simple-dialog-component.css',
})
export class SimpleDialogComponent implements DialogContent<SimpleDialogComponentDialogResult> {
  public readonly interfaceTag: 'dialogContent' = 'dialogContent';

  public constructor() {}

  getResult(): SimpleDialogComponentDialogResult {
    return new SimpleDialogComponentDialogResult();
  }
}

export class SimpleDialogComponentDialogResult implements DialogResult {
  public readonly interfaceTag: 'dialogResult' = 'dialogResult';

  public constructor() {}

  public print(): void {
    console.log('Hello!');
  }
}

export class SimpleDialogComponentDialogData implements DialogData {
  public readonly interfaceTag: 'dialogData' = 'dialogData';

  public constructor() {}

  public getSomeData(): string {
    return 'Some data';
  }
}
