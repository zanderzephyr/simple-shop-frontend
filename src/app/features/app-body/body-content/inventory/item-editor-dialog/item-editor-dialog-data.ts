import { GeneralDialogData } from '@ui/dialog/general-dialog/general-dialog-data';
import { Type } from '@angular/core';
import { ItemEditorDialogComponent } from './item-editor-dialog';
import { Item } from '@api/item/model/item';

export class ItemEditorDialogData extends GeneralDialogData<
  ItemEditorDialogData,
  Item,
  ItemEditorDialogComponent
> {
  public constructor(title: string, contentType: Type<ItemEditorDialogComponent>) {
    super(title, contentType);
  }
}
