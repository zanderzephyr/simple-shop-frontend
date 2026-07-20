import { GeneralDialogData } from '@ui/dialog/general-dialog/general-dialog-data';
import { ItemEditorDialogComponent } from './item-editor-dialog';
import { Item } from '@api/item/model/item';

export class ItemEditorDialogData extends GeneralDialogData<
  ItemEditorDialogData,
  Item,
  ItemEditorDialogComponent
> {
  readonly #item: Item | undefined;

  public constructor(item: Item | undefined, title: string) {
    super(title, ItemEditorDialogComponent);

    this.#item = item;
  }

  public getItem(): Item | undefined {
    return this.#item;
  }
}
