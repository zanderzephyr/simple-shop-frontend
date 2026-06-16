import { Item, ItemBuilder, MediaType } from '@api/item/model/item';
import { Predicate } from '@utils/functional-interfaces';
import { forwardRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => ApiItemService),
})
export abstract class ItemService {
  public constructor() {}

  /**
   * Adds a new item and returns the created item.
   *
   * The technical properties of the passed in item (e.g. the ID field)
   * will be ignored by the backend, as the backend sets them.
   *
   * @returns The item created by the backend.
   */
  // TODO Document
  public abstract addItem(item: Item): Promise<Item>;

  /**
   * Requests all items from the backend, that match the filter.
   *
   * @returns The requested items.
   */
  public abstract getItems(filter?: Predicate<Item>): Promise<readonly Item[]>;

  /**
   * Requests the previous versions of an item.
   *
   * The service returns the list of previous item versions in historic order
   * (earliest first). If the item ID is unknown in the backend, the returned list is empty.
   *
   * @returns The item history or an empty list if the item ID is unknown in the backend.
   */
  // TODO Document
  public abstract getItemHistory(itemId: number): Promise<readonly Item[]>;

  /**
   * Changes an item.
   *
   * The technical properties of the passed in item (e.g. the ID field)
   * will be ignored by the backend, as the backend sets them.
   *
   * @returns The modified item.
   */
  // TODO Document
  public abstract modifyItem(item: Item): Promise<Item>;

  /**
   * Removes the item in the backend.
   */
  // TODO Document
  public abstract removeItem(item: Item): Promise<void>;
}

@Injectable() // Necessary for future dependency injection, even if this class is never directly injected.
class ApiItemService extends ItemService {
  // TODO Just for the prototype, replace with actual request and response processing.
  readonly #items: Item[] = new ItemGenerator().createItems();

  constructor() {
    super();
  }

  // TODO Implement
  public override async addItem(item: Item): Promise<Item> {
    console.log('Adding items not yet implemented!');

    return item;
  }

  // TODO Replace with non-dummy logic
  public override async getItems(filter?: Predicate<Item>): Promise<readonly Item[]> {
    return Object.freeze(filter ? this.#items.filter(filter) : this.#items);
  }

  // TODO Implement
  public override async getItemHistory(itemId: number): Promise<readonly Item[]> {
    return Object.freeze([]);
  }

  // TODO Implement
  public override async modifyItem(item: Item): Promise<Item> {
    console.log('Modifying items not yet implemented!');

    return item;
  }

  /*
		Do not throw in that method, if the item doesn't exist anymore.
   	The current client might try to delete an item, that another client already removed.
	 */
  // TODO Replace with non-dummy logic
  public override async removeItem(item: Item): Promise<void> {
    const index: number = this.#items.indexOf(item);
    if (index >= 0) {
      this.#items.splice(index, 1);
    }
  }
}

// Just needed until we have a proper service
class ItemGenerator {
  static #currentItemId: number = 0;

  public createItems(): Item[] {
    const items: Item[] = [];

    items.push(...this.#createBooks());
    items.push(...this.#createMovies());
    items.push(...this.#createGames());

    return items;
  }

  #createBooks(): Item[] {
    const books: Item[] = [];

    const hp1: Item = new ItemBuilder()
      .setId(++ItemGenerator.#currentItemId)
      .setTitle("Harry Potter and the Sorcerer's Stone")
      .setMediaType(MediaType.BOOK)
      .setStock(5)
      .setPrice(9.99)
      .setImageUrl('https://hp1-link.com')
      .setLastModificationTimestamp('bla')
      .setLastModifyingUserId(123456)
      .build();
    books.push(hp1);

    const lotr1: Item = new ItemBuilder()
      .setId(++ItemGenerator.#currentItemId)
      .setTitle('The Lord of the Rings: The Fellowship of the Ring')
      .setMediaType(MediaType.BOOK)
      .setStock(3)
      .setPrice(12.99)
      .setImageUrl('https://lotr1-link.com')
      .setLastModificationTimestamp('bla')
      .setLastModifyingUserId(123456)
      .build();
    books.push(lotr1);

    return books;
  }

  #createMovies(): Item[] {
    const movies: Item[] = [];

    const hpMovie: Item = new ItemBuilder()
      .setId(++ItemGenerator.#currentItemId)
      .setTitle('Harry Potter and the Sorcerer’s Stone (Movie)')
      .setMediaType(MediaType.MOVIE)
      .setStock(2)
      .setPrice(19.99)
      .setImageUrl('https://hp1-movie-link.com')
      .setLastModificationTimestamp('bla')
      .setLastModifyingUserId(123456)
      .build();
    movies.push(hpMovie);

    const lotrMovie: Item = new ItemBuilder()
      .setId(++ItemGenerator.#currentItemId)
      .setTitle('The Lord of the Rings: The Fellowship of the Ring (Movie)')
      .setMediaType(MediaType.MOVIE)
      .setStock(1)
      .setPrice(24.99)
      .setImageUrl('https://lotr-movie-link.com')
      .setLastModificationTimestamp('bla')
      .setLastModifyingUserId(123456)
      .build();
    movies.push(lotrMovie);

    return movies;
  }

  #createGames(): Item[] {
    const games: Item[] = [];

    const stellaris: Item = new ItemBuilder()
      .setId(++ItemGenerator.#currentItemId)
      .setTitle('Stellaris')
      .setMediaType(MediaType.GAME)
      .setStock(1)
      .setPrice(29.99)
      .setImageUrl('https://stellaris-link.com')
      .setLastModificationTimestamp('bla')
      .setLastModifyingUserId(123456)
      .build();
    games.push(stellaris);

    const skyrim: Item = new ItemBuilder()
      .setId(++ItemGenerator.#currentItemId)
      .setTitle('The Elder Scrolls V: Skyrim')
      .setMediaType(MediaType.GAME)
      .setStock(1)
      .setPrice(29.99)
      .setImageUrl('https://skyrim-link.com')
      .setLastModificationTimestamp('bla')
      .setLastModifyingUserId(123456)
      .build();
    games.push(skyrim);

    return games;
  }
}
