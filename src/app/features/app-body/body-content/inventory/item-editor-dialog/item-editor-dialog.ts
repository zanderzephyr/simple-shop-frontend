import { Component } from '@angular/core';
import { GeneralDialogContentComponent } from '@ui/dialog/general-dialog/general-dialog-content';
import { ItemEditorDialogData } from './item-editor-dialog-data';
import { Item } from '@api/item/model/item';

@Component({
  selector: 'app-item-editor-dialog',
  imports: [],
  templateUrl: './item-editor-dialog.html',
  styleUrl: './item-editor-dialog.css',
})
export class ItemEditorDialogComponent extends GeneralDialogContentComponent<
  ItemEditorDialogData,
  Item
> {
  constructor() {
    super();
  }

  protected override onConfirm(): void {
    // TODO
    //this.setResult(MessageDialogResult.CONFIRM);

    super.onConfirm();
  }

  protected override onCancel(): void {
    // TODO
    //this.setResult(MessageDialogResult.CANCEL);

    super.onCancel();
  }
}
