export class Item {
  readonly #id: number;
  readonly #title: string;
  readonly #mediaType: MediaType;
  readonly #remaining: number;
  readonly #price: number;
  readonly #imageUrl: string;

  constructor(itemData: ItemData) {
    this.#id = itemData.id;
    this.#title = itemData.title;
    this.#mediaType = itemData.mediaType;
    this.#remaining = itemData.remaining;
    this.#price = itemData.price;
    this.#imageUrl = itemData.imageUrl;

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

  public getRemaining(): number {
    return this.#remaining;
  }

  public getPrice(): number {
    return this.#price;
  }

  public getImageUrl(): string {
    return this.#imageUrl;
  }
}

export class ItemBuilder {
  #id?: number;
  #title?: string;
  #mediaType?: MediaType;
  #remaining?: number;
  #price?: number;
  #imageUrl?: string;

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

  public getRemaining(): number | undefined {
    return this.#remaining;
  }

  public setRemaining(remaining: number): this {
    this.#remaining = remaining;
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

  public getItemData(): ItemData {
    this.#validate();

    return {
      // ! tells the compiler, these values can't be null or undefined.
      id: this.#id!,
      title: this.#title!,
      mediaType: this.#mediaType!,
      remaining: this.#remaining!,
      price: this.#price!,
      imageUrl: this.#imageUrl!,
    };
  }

  #validate(): void {
    if (this.#id === undefined) {
      throw new Error('No item ID!');
    }

    if (this.#title === undefined) {
      throw new Error('No item title!');
    }

    if (this.#remaining === undefined) {
      throw new Error('No item remaining!');
    }

    if (this.#price === undefined) {
      throw new Error('No item price!');
    }

    if (this.#imageUrl === undefined) {
      throw new Error('No item image URL!');
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
  remaining: number;
  price: number;
  imageUrl: string;
}

export const MediaType: {
  readonly Book: { readonly id: 'book'; readonly name: 'Book' };
  readonly Game: { readonly id: 'game'; readonly name: 'Game' };
  readonly Movie: { readonly id: 'movie'; readonly name: 'Movie' };
} = {
  Book: { id: 'book', name: 'Book' },
  Game: { id: 'game', name: 'Game' },
  Movie: { id: 'movie', name: 'Movie' },
} as const;
type ValueOf<T> = T[keyof T];
export type MediaType = ValueOf<typeof MediaType>;
