export class Item {
  readonly #id: number;
  readonly #title: string;
  readonly #mediaType: MediaType;
  readonly #stock: number;
  readonly #price: number;
  readonly #imageUrl: string;
  // TODO Use a proper date time type for that
  readonly #lastModificationTimestamp: string;
  readonly #lastModifyingUserId: number;

  constructor(itemData: ItemData) {
    this.#id = itemData.id;
    this.#title = itemData.title;
    this.#mediaType = itemData.mediaType;
    this.#stock = itemData.stock;
    this.#price = itemData.price;
    this.#imageUrl = itemData.imageUrl;
    this.#lastModificationTimestamp = itemData.lastModificationTimestamp;
    this.#lastModifyingUserId = itemData.lastModifyingUserId;

    Object.freeze(this);
  }
  public getId(): number {
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

  public getLastModificationTimestamp(): string {
    return this.#lastModificationTimestamp;
  }

  public getLastModifyingUserId(): number {
    return this.#lastModifyingUserId;
  }
}

/**
 * Only to be used by the item service.
 */
export class ItemBuilder {
  /**
   * Is only to be set by the item service.
   */
  #id?: number;
  #title?: string;
  #mediaType?: MediaType;
  #stock?: number;
  #price?: number;
  #imageUrl?: string;
  /**
   * Is only to be set by the item service.
   */
  #lastModificationTimestamp?: string;
  #lastModifyingUserId?: number;

  constructor() {
    // Nothing to do so far
  }

  public getId(): number | undefined {
    return this.#id;
  }
  public setId(id: number): this {
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

  public getLastModificationTimestamp(): string | undefined {
    return this.#lastModificationTimestamp;
  }

  public setLastModificationTimestamp(lastModificationTimestamp: string): this {
    this.#lastModificationTimestamp = lastModificationTimestamp;
    return this;
  }

  public getLastModifyingUserId(): number | undefined {
    return this.#lastModifyingUserId;
  }

  public setLastModifyingUserId(lastModifyingUserId: number): this {
    this.#lastModifyingUserId = lastModifyingUserId;
    return this;
  }

  public getItemData(): ItemData {
    this.#validate();

    return {
      // ! tells the compiler, these values can't be null or undefined.
      id: this.#id!,
      title: this.#title!,
      mediaType: this.#mediaType!,
      stock: this.#stock!,
      price: this.#price!,
      imageUrl: this.#imageUrl!,
      lastModificationTimestamp: this.#lastModificationTimestamp!,
      lastModifyingUserId: this.#lastModifyingUserId!,
    };
  }

  #validate(): void {
    if (this.#id === undefined) {
      throw new Error('No item ID!');
    }

    if (this.#title === undefined) {
      throw new Error('No item title!');
    }

    if (this.#stock === undefined) {
      throw new Error('No stock!');
    }

    if (this.#price === undefined) {
      throw new Error('No item price!');
    }

    if (this.#imageUrl === undefined) {
      throw new Error('No item image URL!');
    }

    if (this.#lastModificationTimestamp === undefined) {
      throw new Error('No last modification timestamp!');
    }

    if (this.#lastModifyingUserId === undefined) {
      throw new Error('No last modification user ID!');
    }
  }

  public build(): Item {
    return new Item(this.getItemData());
  }
}

/*
 Not exported, just as an internal part of the contract.
 Nobody can call the Item constructor without this interface
 being exported.
 */
interface ItemData {
  id: number;
  title: string;
  mediaType: MediaType;
  stock: number;
  price: number;
  imageUrl: string;
  lastModificationTimestamp: string;
  lastModifyingUserId: number;
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
