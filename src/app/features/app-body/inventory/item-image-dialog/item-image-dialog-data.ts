import { Item } from '@api/item/model/item';
import { GeneralDialogData } from '@ui/dialog/general-dialog/general-dialog-data';
import { ItemImageDialogComponent } from './item-image-dialog';

export class ItemImageDialogData extends GeneralDialogData<
	ItemImageDialogData,
	void,
	ItemImageDialogComponent
> {
	readonly #item: Item;

	public constructor(item: Item, title: string) {
		super(title, ItemImageDialogComponent);

		this.#item = item;
	}

	public getItem(): Item {
		return this.#item;
	}
}
