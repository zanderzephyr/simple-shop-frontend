import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';
import { InvalidStateError } from '@core/utils/common-errors';
import { z, ZodType } from 'zod';
import { convertStringToEnum, parseLocalDateTime } from '@core/utils/data-type-utils';

const secretKey: symbol = Symbol('secretKey');

/*
 Not exported, just as an internal part of the contract.
 Nobody can call the Item constructor without this interface
 being exported.
 */
interface ItemData {
  [secretKey]: true; // Marker to prevent external construction
  id: bigint | undefined;
  title: string;
  mediaType: MediaType;
  stock: number;
  price: number;
  imageUrl: string;
  lastChange: LocalDateTime | undefined;
  lastChangedBy: bigint | undefined;
  version: bigint | undefined;
}

export const MediaType: {
  readonly BOOK: { readonly id: 'BOOK'; readonly name: 'Book' };
  readonly GAME: { readonly id: 'GAME'; readonly name: 'Game' };
  readonly MOVIE: { readonly id: 'MOVIE'; readonly name: 'Movie' };
} = {
  BOOK: { id: 'BOOK', name: 'Book' },
  GAME: { id: 'GAME', name: 'Game' },
  MOVIE: { id: 'MOVIE', name: 'Movie' },
} as const;
type ValueOf<T> = T[keyof T];
export type MediaType = ValueOf<typeof MediaType>;

export class Item {
  readonly #id: bigint | undefined;
  readonly #title: string;
  readonly #mediaType: MediaType;
  readonly #stock: number;
  readonly #price: number;
  readonly #imageUrl: string;
  readonly #lastChange: LocalDateTime | undefined;
  readonly #lastChangedBy: bigint | undefined;
  readonly #version: bigint | undefined;

  public constructor(itemData: ItemData) {
    this.#id = itemData.id;
    this.#title = itemData.title;
    this.#mediaType = itemData.mediaType;
    this.#stock = itemData.stock;
    this.#price = itemData.price;
    this.#imageUrl = itemData.imageUrl;
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

  public getImageUrl(): string {
    return this.#imageUrl;
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
  #imageUrl?: string;
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
  public setId(id: bigint): this {
    this.#id = id;
    return this;
  }

  public getTitle(): string | undefined {
    return this.#title;
  }

  public setTitle(title: string): this {
    this.#title = title;
    return this;
  }

  public getMediaType(): MediaType | undefined {
    return this.#mediaType;
  }

  public setMediaType(mediaType: MediaType): this {
    this.#mediaType = mediaType;
    return this;
  }

  public getStock(): number | undefined {
    return this.#stock;
  }

  public setStock(stock: number): this {
    this.#stock = stock;
    return this;
  }

  public getPrice(): number | undefined {
    return this.#price;
  }

  public setPrice(price: number): this {
    this.#price = price;
    return this;
  }

  public getImageUrl(): string | undefined {
    return this.#imageUrl;
  }
  public setImageUrl(imageUrl: string): this {
    this.#imageUrl = imageUrl;
    return this;
  }

  public getLastChange(): LocalDateTime | undefined {
    return this.#lastChange;
  }

  public setLastChange(lastChange: LocalDateTime): this {
    this.#lastChange = lastChange;
    return this;
  }

  public getLastChangedBy(): bigint | undefined {
    return this.#lastChangedBy;
  }

  public setLastChangedBy(lastChangedBy: bigint): this {
    this.#lastChangedBy = lastChangedBy;
    return this;
  }

  public getVersion(): bigint | undefined {
    return this.#version;
  }

  public setVersion(version: bigint): this {
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
      imageUrl: this.#imageUrl!,
      lastChange: this.#lastChange,
      lastChangedBy: this.#lastChangedBy,
      version: this.#version,
    };
  }

  #validate(): void {
    if (this.#id !== undefined && this.#id < 0n) {
      throw new InvalidStateError('Invalid item ID!');
    }

    if (this.#lastChangedBy !== undefined && this.#lastChangedBy < 0n) {
      throw new InvalidStateError('Invalid last changed by!');
    }

    if (this.#title === undefined) {
      throw new InvalidStateError('No item title!');
    }

    if (this.#stock === undefined || this.#stock < 0) {
      throw new InvalidStateError('No stock!');
    }

    if (this.#price === undefined || this.#price < 0) {
      throw new InvalidStateError('No item price!');
    }

    if (this.#imageUrl === undefined) {
      throw new InvalidStateError('No item image URL!');
    }

    if (this.#version !== undefined && this.#version < 0n) {
      throw new InvalidStateError('Invalid item version!');
    }
  }

  public build(): Item {
    return new Item(this.#createItemData());
  }
}

export interface ItemDto {
  /**
   * Can be missing to the backend, never from the backend.
   */
  id: string | undefined;
  title: string;
  mediaType: string;
  stock: number;
  price: number;
  imageUrl: string;
  /**
   * Can be missing to the backend, never from the backend.
   */
  lastChange: string | undefined;
  /**
   * Can be missing to the backend, never from the backend.
   */
  lastChangedBy: string | undefined;
  /**
   * Can be missing to the backend, never from the backend.
   */
  version: string | undefined;
}

export const dateTimeFormatter: DateTimeFormatter =
  DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss.SSS');

export function zodItem(): ZodType<Item> {
  return z
    .object({
      id: z.string().transform((val) => BigInt(val)),
      title: z.string(),
      mediaType: z.string().transform((val) => convertStringToEnum(val, MediaType)!),
      stock: z.number(),
      price: z.number(),
      imageUrl: z.string(),
      lastChange: z.string().transform((val) => parseLocalDateTime(val, dateTimeFormatter)),
      lastChangedBy: z.string().transform((val) => BigInt(val)),
      version: z.string().transform((val) => BigInt(val)),
    })
    .transform((data): Item => {
      return new ItemBuilder()
        .setId(data.id!)
        .setTitle(data.title)
        .setMediaType(data.mediaType)
        .setStock(data.stock)
        .setPrice(data.price)
        .setImageUrl(data.imageUrl)
        .setLastChange(data.lastChange!)
        .setLastChangedBy(data.lastChangedBy!)
        .setVersion(data.version!)
        .build();
    });
}
