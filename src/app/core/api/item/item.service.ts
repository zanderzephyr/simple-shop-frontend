import { Item, ItemBuilder, MediaType } from '@app/core/api/item/model/item';
import { signal, Signal, Injectable, WritableSignal } from '@angular/core';

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
  public abstract addItem(item: Item): void;

  public abstract getItems(): Signal<readonly Item[]>;

  /**
   * Retrieves an item with ID of itemId from the item
   * service if such an item exists.
   *
   * @returns The item with ID itemId or null if such an
   * item doesn't exist.
   */
  public abstract getItem(itemId: number): Item | null;

  public abstract modifyItem(item: Item): void;

  public abstract removeItem(item: Item): void;
}

@Injectable() // Necessary for future dependency injection, even if this class is never directly injected.
class ApiItemService extends ItemService {
  readonly #items: WritableSignal<readonly Item[]> = signal(
    Object.freeze(new ItemGenerator().createItems()),
  );

  readonly #itemsPublic: Signal<readonly Item[]> = this.#items.asReadonly();

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

  public addItem(item: Item): void {
    // TODO
    console.log('Adding items not yet implemented!');
  }

  // TODO replace with actual request and response processing.
  public getItems(): Signal<readonly Item[]> {
    return this.#itemsPublic;
  }

  public getItem(itemId: number): Item | null {
    return this.#itemsPublic().find((item) => item.getId() === itemId) ?? null;
  }

  public modifyItem(item: Item): void {
    // TODO
    console.log('Modifying items not yet implemented!');
  }

  public removeItem(item: Item): void {
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
      .setMediaType(MediaType.Book)
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
      .setMediaType(MediaType.Book)
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
      .setMediaType(MediaType.Movie)
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
      .setMediaType(MediaType.Movie)
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
      .setMediaType(MediaType.Game)
      .setRemaining(1)
      .setPrice(29.99)
      .setImageUrl('https://upload.wikimedia.org/wikipedia/en/8/8c/The_Lord_of_the_Rings_cover.gif')
      .build();
    games.push(stellaris);

    const skyrim: Item = new ItemBuilder()
      .setId(++ItemGenerator.#currentItemId)
      .setTitle('The Elder Scrolls V: Skyrim')
      .setMediaType(MediaType.Game)
      .setRemaining(1)
      .setPrice(29.99)
      .setImageUrl('https://upload.wikimedia.org/wikipedia/en/8/8c/The_Lord_of_the_Rings_cover.gif')
      .build();
    games.push(skyrim);

    return games;
  }
}
