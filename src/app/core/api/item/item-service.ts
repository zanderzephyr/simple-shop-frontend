import { Item, ItemBuilder, ItemDto, MediaType } from '@api/item/model/item';
import { firstValueFrom } from 'rxjs';
import { forwardRef, inject, Injectable } from '@angular/core';
import { PageConfig } from '@app/core/utils/page-config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ItemSerializer } from './item-serializer';
import { Page, PageBuilder, PageDto } from '@core/utils/page';
import { ItemDeserializer } from './item-deserializer';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => ApiItemService),
})
export abstract class ItemService {
  public constructor() {}

  /**
   * Adds a new item and returns the created item.
   *
   * An item to create must have id of -1 and version of null.
   * The backend will set the technical properties of the item (e.g. the ID field)
   * and return the created item.
   *
   * @returns The item created by the backend.
   */
  // TODO Document
  public abstract addItem(item: Item): Promise<Item>;

  /**
   * Requests an item by its ID from the backend.
   *
   * @returns The requested item or null if not found.
   */
  public abstract getItemById(id: bigint): Promise<Item | null>;

  /**
   * Requests items based on the provided page configuration.
   *
   * @returns The list of requested items.
   */
  // TODO This returns a page, that contains the items and the total number of items in the backend. Adapt the return type accordingly.
  public abstract getItems(pageConfig: PageConfig): Promise<Page<Item>>;

  /**
   * Changes an item.
   *
   * @returns The modified item.
   */
  // TODO Document
  public abstract modifyItem(item: Item): Promise<Item>;

  /**
   * Removes an item in the backend.
   */
  // TODO Document
  public abstract removeItem(item: Item): Promise<void>;
}

@Injectable() // Necessary for future dependency injection, even if this class is never directly injected.
class ApiItemService extends ItemService {
  readonly #url = '/api/api/v1/items';

  readonly #httpClient = inject(HttpClient);

  constructor() {
    super();
  }

  public override async addItem(item: Item): Promise<Item> {
    const body: string = ItemSerializer.serialize(item);
    const itemJson: string = await firstValueFrom(this.#httpClient.post<string>(this.#url, body));
    return ItemDeserializer.deserialize(itemJson);
  }

  public override async getItemById(id: bigint): Promise<Item | null> {
    const url: string = this.#url + '/' + id.toString();
    const itemJson: string = await firstValueFrom(this.#httpClient.get<string>(url));
    return ItemDeserializer.deserialize(itemJson);
  }

  public override async getItems(pageConfig: PageConfig): Promise<Page<Item>> {
    const params: HttpParams = new HttpParams()
      .set('pageIndex', pageConfig.getPageIndex().toString())
      .set('pageSize', pageConfig.getPageSize().toString());

    const responseRaw: PageDto<string> = await firstValueFrom(
      this.#httpClient.get<PageDto<string>>(this.#url, { params }),
    );

    const items: Item[] = responseRaw.content.map((itemJson: string) =>
      ItemDeserializer.deserialize(itemJson),
    );

    return new PageBuilder<Item>()
      .setContent(items)
      .setPageIndex(responseRaw.pageIndex)
      .setPageSize(responseRaw.pageSize)
      .setTotalElements(responseRaw.totalElements)
      .setTotalPages(responseRaw.totalPages)
      .build();
  }

  public override async modifyItem(item: Item): Promise<Item> {
    const body: string = ItemSerializer.serialize(item);
    const url: string = this.#url + '/' + item.getId().toString();
    const itemJson: string = await firstValueFrom(this.#httpClient.put<string>(url, body));
    return ItemDeserializer.deserialize(itemJson);
  }

  /*
		Do not throw in that method, if the item doesn't exist anymore.
   	The current client might try to delete an item, that another client already removed.
	 */
  public override async removeItem(item: Item): Promise<void> {
    const url: string = this.#url + '/' + item.getId().toString();
    await firstValueFrom(this.#httpClient.delete<void>(url));
  }
}

// Just needed until we have a proper service
class ItemGenerator {
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
      .setTitle("Harry Potter and the Sorcerer's Stone")
      .setMediaType(MediaType.BOOK)
      .setStock(5)
      .setPrice(9.99)
      .setImageUrl('https://hp1-link.com')
      .build();
    books.push(hp1);

    const lotr1: Item = new ItemBuilder()
      .setTitle('The Lord of the Rings: The Fellowship of the Ring')
      .setMediaType(MediaType.BOOK)
      .setStock(3)
      .setPrice(12.99)
      .setImageUrl('https://lotr1-link.com')
      .build();
    books.push(lotr1);

    return books;
  }

  #createMovies(): Item[] {
    const movies: Item[] = [];

    const hpMovie: Item = new ItemBuilder()
      .setTitle('Harry Potter and the Sorcerer’s Stone (Movie)')
      .setMediaType(MediaType.MOVIE)
      .setStock(2)
      .setPrice(19.99)
      .setImageUrl('https://hp1-movie-link.com')
      .build();
    movies.push(hpMovie);

    const lotrMovie: Item = new ItemBuilder()
      .setTitle('The Lord of the Rings: The Fellowship of the Ring (Movie)')
      .setMediaType(MediaType.MOVIE)
      .setStock(1)
      .setPrice(24.99)
      .setImageUrl('https://lotr-movie-link.com')
      .build();
    movies.push(lotrMovie);

    return movies;
  }

  #createGames(): Item[] {
    const games: Item[] = [];

    const stellaris: Item = new ItemBuilder()
      .setTitle('Stellaris')
      .setMediaType(MediaType.GAME)
      .setStock(1)
      .setPrice(29.99)
      .setImageUrl('https://stellaris-link.com')
      .build();
    games.push(stellaris);

    const skyrim: Item = new ItemBuilder()
      .setTitle('The Elder Scrolls V: Skyrim')
      .setMediaType(MediaType.GAME)
      .setStock(1)
      .setPrice(29.99)
      .setImageUrl('https://skyrim-link.com')
      .build();
    games.push(skyrim);

    return games;
  }
}
