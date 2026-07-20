import { Component } from '@angular/core';
import { GeneralDialogContentComponent } from '@ui/dialog/general-dialog/general-dialog-content';
import { ItemEditorDialogData } from './item-editor-dialog-data';
import { Item, ItemBuilder } from '@api/item/model/item';

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
    this.setResult(this.#createItem());

    super.onConfirm();
  }

  #createItem(): Item {
    return (
      new ItemBuilder() //
        // TODO
        .build()
    );
  }

  protected override onCancel(): void {
    this.setResult(undefined);

    super.onCancel();
  }
}
