import { Item } from '@api/item/model/item';
import { IllegalStateError } from '@core/utils/common-errors';

const secretKey: symbol = Symbol('secretKey');

interface ItemOverviewDataData {
	[secretKey]: true; // Marker to prevent external construction
	item: Item;
	discount?: number;
}

export class ItemOverviewData {
	readonly #item: Item;

	/**
	 * Discount percentage as a number in (0, 1].
	 */
	readonly #discount?: number;

	public constructor(itemOverviewDataData: ItemOverviewDataData) {
		this.#item = itemOverviewDataData.item;
		this.#discount = itemOverviewDataData.discount;

		Object.freeze(this);
	}

	public getItem(): Item {
		return this.#item;
	}

	public getDiscount(): number | undefined {
		return this.#discount;
	}
}

export class ItemOverviewDataBuilder {
	#item?: Item;
	#discount?: number;

	public constructor() {
		// Nothing to do so far
	}

	public getItem(): Item | undefined {
		return this.#item;
	}

	public setItem(item: Item | undefined): this {
		this.#item = item;
		return this;
	}

	public getDiscount(): number | undefined {
		return this.#discount;
	}

	public setDiscount(discount: number | undefined): this {
		this.#discount = discount;
		return this;
	}

	#createItemOverviewDataData(): ItemOverviewDataData {
		this.#validate();

		// Existence of fields relies on the validation above.
		return {
			[secretKey]: true,
			item: this.#item!,
			discount: this.#discount
		};
	}

	#validate(): void {
		if (this.#item === undefined) {
			throw new IllegalStateError('No item!');
		}

		if (this.#discount !== undefined && this.#discount <= 0) {
			throw new IllegalStateError('No discount!');
		}
	}

	public build(): ItemOverviewData {
		return new ItemOverviewData(this.#createItemOverviewDataData());
	}
}
