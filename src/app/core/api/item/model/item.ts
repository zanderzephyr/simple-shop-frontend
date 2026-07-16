import { LocalDateTime } from '@js-joda/core';
import { InvalidStateError } from '@core/utils/common-errors';

const secretKey: symbol = Symbol('secretKey');

/*
 Not exported, just as an internal part of the contract.
 Nobody can call the Item constructor without this interface
 being exported.
 */
interface ItemData {
  [secretKey]: true; // Marker to prevent external construction
  id: bigint;
  title: string;
  mediaType: MediaType;
  stock: number;
  price: number;
  imageUrl: string;
  lastChange: LocalDateTime;
  lastChangedBy: bigint;
  version: bigint;
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
  readonly #id: bigint;
  readonly #title: string;
  readonly #mediaType: MediaType;
  readonly #stock: number;
  readonly #price: number;
  readonly #imageUrl: string;
  readonly #lastChange: LocalDateTime;
  readonly #lastChangedBy: bigint;
  readonly #version: bigint;

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

  public getId(): bigint {
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

  public getLastChange(): LocalDateTime {
    return this.#lastChange;
  }

  public getLastChangedBy(): bigint {
    return this.#lastChangedBy;
  }

  public getVersion(): bigint {
    return this.#version;
  }
}

export class ItemBuilder {
  /**
   * Is only to be set by the item service.
   *
   * For creation, use -1.
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
  #lastChangedBy?: bigint;
  /**
   * Is only to be set by the item service.
   *
   * For creation, use -1.
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

    return {
      [secretKey]: true,
      id: this.#id!,
      title: this.#title!,
      mediaType: this.#mediaType!,
      stock: this.#stock!,
      price: this.#price!,
      imageUrl: this.#imageUrl!,
      lastChange: this.#lastChange!,
      lastChangedBy: this.#lastChangedBy!,
      version: this.#version!,
    };
  }

  #validate(): void {
    if (this.#id === undefined || this.#id < 0n) {
      throw new InvalidStateError('Invalid item ID!');
    }

    if (this.#title === undefined) {
      throw new InvalidStateError('No item title!');
    }

    if (this.#stock === undefined) {
      throw new InvalidStateError('No stock!');
    }

    if (this.#price === undefined) {
      throw new InvalidStateError('No item price!');
    }

    if (this.#imageUrl === undefined) {
      throw new InvalidStateError('No item image URL!');
    }

    if (this.#lastChange === undefined) {
      throw new InvalidStateError('No last change timestamp!');
    }

    if (this.#lastChangedBy === undefined) {
      throw new InvalidStateError('No last changed by user ID!');
    }
  }

  public build(): Item {
    return new Item(this.#createItemData());
  }
}

export interface ItemDto {
  id: string;
  title: string;
  mediaType: string;
  stock: number;
  price: number;
  imageUrl: string;
  version: number;
}
