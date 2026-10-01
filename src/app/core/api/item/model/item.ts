import { IllegalStateError } from '@core/utils/common-errors';
import { convertStringToEnum, parseLocalDateTime } from '@core/utils/data-type-utils';
import { isBlank } from '@core/utils/string-utils';
import { LocalDateTime } from '@js-joda/core';
import { ZodType } from 'zod';
import { dateTimeFormatter, ItemDto, zodItemDto } from '../dto/item-dto';
import { MediaType } from './media-type';

const secretKey: symbol = Symbol('secretKey');

/*
 Not exported, just as an internal part of the contract.
 Nobody can call the Item constructor without this interface
 being exported.
 */
interface ItemData {
	[secretKey]: true; // Marker to prevent external construction
	id?: bigint;
	title: string;
	mediaType: MediaType;
	stock: number;
	price: number;
	description: string;
	lastChange?: LocalDateTime;
	lastChangedBy?: bigint;
	version?: bigint;
}

export class Item {
	readonly #id?: bigint;
	readonly #title: string;
	readonly #mediaType: MediaType;
	readonly #stock: number;
	readonly #price: number;
	readonly #description: string;
	readonly #lastChange?: LocalDateTime;
	readonly #lastChangedBy?: bigint;
	readonly #version?: bigint;

	public constructor(itemData: ItemData) {
		this.#id = itemData.id;
		this.#title = itemData.title;
		this.#mediaType = itemData.mediaType;
		this.#stock = itemData.stock;
		this.#price = itemData.price;
		this.#description = itemData.description;
		this.#lastChange = itemData.lastChange;
		this.#lastChangedBy = itemData.lastChangedBy;
		this.#version = itemData.version;

		Object.freeze(this);
	}

	public getId(): bigint | undefined {
		return this.#id;
	}

	public getTitle(): string {
		return this.#title;
	}

	public getMediaType(): MediaType {
		return this.#mediaType;
	}

	public getStock(): number {
		return this.#stock;
	}

	public getPrice(): number {
		return this.#price;
	}

	public getDescription(): string {
		return this.#description;
	}

	public getLastChange(): LocalDateTime | undefined {
		return this.#lastChange;
	}

	public getLastChangedBy(): bigint | undefined {
		return this.#lastChangedBy;
	}

	public getVersion(): bigint | undefined {
		return this.#version;
	}
}

export class ItemBuilder {
	/**
	 * Is only to be set by the item service.
	 */
	#id?: bigint;
	#title?: string;
	#mediaType?: MediaType;
	#stock?: number;
	#price?: number;
	#description?: string;
	/**
	 * Is only to be set by the item service.
	 */
	#lastChange?: LocalDateTime;
	/**
	 * Is only to be set by the item service.
	 */
	#lastChangedBy?: bigint;
	/**
	 * Is only to be set by the item service.
	 */
	#version?: bigint;

	public constructor() {
		// Nothing to do so far
	}

	public getId(): bigint | undefined {
		return this.#id;
	}

	public setId(id: bigint | undefined): this {
		this.#id = id;
		return this;
	}

	public getTitle(): string | undefined {
		return this.#title;
	}

	public setTitle(title: string | undefined): this {
		this.#title = title;
		return this;
	}

	public getMediaType(): MediaType | undefined {
		return this.#mediaType;
	}

	public setMediaType(mediaType: MediaType | undefined): this {
		this.#mediaType = mediaType;
		return this;
	}

	public getStock(): number | undefined {
		return this.#stock;
	}

	public setStock(stock: number | undefined): this {
		this.#stock = stock;
		return this;
	}

	public getPrice(): number | undefined {
		return this.#price;
	}

	public setPrice(price: number | undefined): this {
		this.#price = price;
		return this;
	}

	public getDescription(): string | undefined {
		return this.#description;
	}

	public setDescription(description: string | undefined): this {
		this.#description = description;
		return this;
	}

	public getLastChange(): LocalDateTime | undefined {
		return this.#lastChange;
	}

	public setLastChange(lastChange: LocalDateTime | undefined): this {
		this.#lastChange = lastChange;
		return this;
	}

	public getLastChangedBy(): bigint | undefined {
		return this.#lastChangedBy;
	}

	public setLastChangedBy(lastChangedBy: bigint | undefined): this {
		this.#lastChangedBy = lastChangedBy;
		return this;
	}

	public getVersion(): bigint | undefined {
		return this.#version;
	}

	public setVersion(version: bigint | undefined): this {
		this.#version = version;
		return this;
	}

	#createItemData(): ItemData {
		this.#validate();

		// Existence of fields relies on the validation above.
		return {
			[secretKey]: true,
			id: this.#id,
			title: this.#title!,
			mediaType: this.#mediaType!,
			stock: this.#stock!,
			price: this.#price!,
			description: this.#description!,
			lastChange: this.#lastChange,
			lastChangedBy: this.#lastChangedBy,
			version: this.#version
		};
	}

	#validate(): void {
		if (this.#id !== undefined && this.#id < 0n) {
			throw new IllegalStateError('Invalid item ID!');
		}

		if (this.#title === undefined || isBlank(this.#title)) {
			throw new IllegalStateError('No item title!');
		}

		if (this.#stock === undefined || this.#stock < 0) {
			throw new IllegalStateError('No stock!');
		}

		if (this.#price === undefined || this.#price < 0) {
			throw new IllegalStateError('No item price!');
		}

		if (this.#description === undefined || isBlank(this.#description)) {
			throw new IllegalStateError('No description!');
		}

		if (this.#lastChangedBy !== undefined && this.#lastChangedBy < 0n) {
			throw new IllegalStateError('Invalid last changed by!');
		}

		if (this.#version !== undefined && this.#version < 0n) {
			throw new IllegalStateError('Invalid version!');
		}
	}

	public build(): Item {
		return new Item(this.#createItemData());
	}
}

export function zodItem(): ZodType<Item> {
	return zodItemDto().transform((dto: ItemDto): Item => {
		return new ItemBuilder()
			.setId(BigInt(dto.id!))
			.setTitle(dto.title)
			.setMediaType(convertStringToEnum(dto.mediaType, MediaType)!)
			.setStock(dto.stock)
			.setPrice(dto.price)
			.setDescription(dto.description)
			.setLastChange(parseLocalDateTime(dto.lastChange!, dateTimeFormatter))
			.setLastChangedBy(BigInt(dto.lastChangedBy!))
			.setVersion(BigInt(dto.version!))
			.build();
	});
}
