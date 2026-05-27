import { Item, ItemBuilder, MediaType } from '@app/core/api/item/model/item';
import { signal, Signal, Injectable, WritableSignal } from '@angular/core';
import { Predicate } from '@core/utils/functional-interfaces';

let INSTANCE: ItemService | null = null;

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    if (!INSTANCE) {
      INSTANCE = new ApiItemService();
    }
    return INSTANCE;
  },
})
export abstract class ItemService {
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
  readonly #items: readonly Item[] = Object.freeze(new ItemGenerator().createItems());

  constructor() {
    if (INSTANCE) {
      throw new Error(
        'Instantiation failed: ' +
          ApiItemService.name +
          ' is a singleton managed by the framework. Manual creation or re-providing is forbidden.',
      );
    } else {
      super();
    }
  }

  public override async addItem(item: Item): Promise<Item> {
    // TODO
    console.log('Adding items not yet implemented!');

    return item;
  }

  // TODO replace with actual request and response processing.
  public override async getItems(filter?: Predicate<Item>): Promise<readonly Item[]> {
    return Object.freeze(filter ? this.#items.filter(filter) : this.#items);
  }

  public override async getItemHistory(itemId: number): Promise<readonly Item[]> {
    return Object.freeze([]);
  }

  public override async modifyItem(item: Item): Promise<Item> {
    // TODO
    console.log('Modifying items not yet implemented!');

    return item;
  }

  public override async removeItem(item: Item): Promise<void> {
    // TODO
    console.log('Removing items not yet implemented!');
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
      .setRemaining(5)
      .setPrice(9.99)
      .setImageUrl(
        'https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg',
      )
      .build();
    books.push(hp1);

    const lotr1: Item = new ItemBuilder()
      .setId(++ItemGenerator.#currentItemId)
      .setTitle('The Lord of the Rings: The Fellowship of the Ring')
      .setMediaType(MediaType.BOOK)
      .setRemaining(3)
      .setPrice(12.99)
      .setImageUrl('https://upload.wikimedia.org/wikipedia/en/8/8c/The_Lord_of_the_Rings_cover.gif')
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
      .setRemaining(2)
      .setPrice(19.99)
      .setImageUrl(
        'https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg',
      )
      .build();
    movies.push(hpMovie);

    const lotrMovie: Item = new ItemBuilder()
      .setId(++ItemGenerator.#currentItemId)
      .setTitle('The Lord of the Rings: The Fellowship of the Ring (Movie)')
      .setMediaType(MediaType.MOVIE)
      .setRemaining(1)
      .setPrice(24.99)
      .setImageUrl('https://upload.wikimedia.org/wikipedia/en/8/8c/The_Lord_of_the_Rings_cover.gif')
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
      .setRemaining(1)
      .setPrice(29.99)
      .setImageUrl('https://upload.wikimedia.org/wikipedia/en/8/8c/The_Lord_of_the_Rings_cover.gif')
      .build();
    games.push(stellaris);

    const skyrim: Item = new ItemBuilder()
      .setId(++ItemGenerator.#currentItemId)
      .setTitle('The Elder Scrolls V: Skyrim')
      .setMediaType(MediaType.GAME)
      .setRemaining(1)
      .setPrice(29.99)
      .setImageUrl('https://upload.wikimedia.org/wikipedia/en/8/8c/The_Lord_of_the_Rings_cover.gif')
      .build();
    games.push(skyrim);

    return games;
  }
}
