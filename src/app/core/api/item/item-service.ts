import { Item, ItemBuilder, ItemDto, MediaType, zodItem } from '@api/item/model/item';
import { firstValueFrom } from 'rxjs';
import { forwardRef, inject, Injectable } from '@angular/core';
import { PageConfig } from '@app/core/utils/page/page-config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ItemSerializer } from './item-serializer';
import { Page, PageBuilder, PageDto, zodPage } from '@core/utils/page/page';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => ApiItemService),
})
export abstract class ItemService {
  public constructor() {}

  /**
   * Adds a new item and returns the created item.
   *
   * An item to create must have id and version of -1.
   * The backend will set the technical properties of the item (e.g. the ID field)
   * and return the created item.
   *
   * @returns The item created by the backend.
   */
  // TODO Document
  public abstract createItem(item: Item): Promise<Item>;

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
  public abstract deleteItem(item: Item): Promise<void>;
}

@Injectable() // Necessary for future dependency injection, even if this class is never directly injected.
class ApiItemService extends ItemService {
  readonly #url = '/api/api/v1/items';

  readonly #httpClient = inject(HttpClient);

  constructor() {
    super();
  }

  public override async createItem(item: Item): Promise<Item> {
    const body: string = ItemSerializer.serialize(item);
    const headers: HttpHeaders = this.#createHeaders();
    const options = { headers };

    const itemDto: ItemDto = await firstValueFrom(
      this.#httpClient.post<ItemDto>(this.#url, body, options),
    );
    return zodItem().parse(itemDto);
  }

  public override async getItemById(id: bigint): Promise<Item | null> {
    const url: string = this.#url + '/' + id.toString();
    const itemDto: ItemDto = await firstValueFrom(this.#httpClient.get<ItemDto>(url));
    return zodItem().parse(itemDto);
  }

  public override async getItems(pageConfig: PageConfig): Promise<Page<Item>> {
    const params: HttpParams = new HttpParams()
      .set('pageIndex', pageConfig.getPageIndex().toString())
      .set('pageSize', pageConfig.getPageSize().toString());
    const options = { params };

    const pageDto: PageDto<ItemDto> = await firstValueFrom(
      this.#httpClient.get<PageDto<ItemDto>>(this.#url, options),
    );

    return zodPage(zodItem()).parse(pageDto);
  }

  public override async modifyItem(item: Item): Promise<Item> {
    const body: string = ItemSerializer.serialize(item);
    const url: string = this.#url + '/' + item.getId().toString();
    const headers: HttpHeaders = this.#createHeaders();
    const options = { headers };

    const itemDto: ItemDto = await firstValueFrom(
      this.#httpClient.put<ItemDto>(url, body, options),
    );
    return zodItem().parse(itemDto);
  }

  /*
		Do not throw in that method, if the item doesn't exist anymore.
   	The current client might try to delete an item, that another client already removed.
	 */
  public override async deleteItem(item: Item): Promise<void> {
    const url: string = this.#url + '/' + item.getId().toString();
    await firstValueFrom(this.#httpClient.delete(url));
  }

  #createHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }
}
