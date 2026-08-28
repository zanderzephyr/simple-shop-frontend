import { forwardRef, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemSerializer } from './item-serializer';
import { Page, PageDto, zodPage } from '@core/utils/page/page';
import { IllegalArgumentError } from '@core/utils/common-errors';
import { PageConfig } from '@core/utils/page/page-config';
import { Item, zodItem } from '@api/item/model/item';
import { ItemDto } from '@api/item/dto/item-dto';
import { executeApiCall, ObjectNotFoundError } from '@core/utils/api-errors';

@Injectable({
	providedIn: 'root',
	useClass: forwardRef(() => ApiItemService)
})
export abstract class ItemService {
	public constructor() {
	}

	/**
	 * Adds a new item and returns the created item.
	 *
	 * The backend will set the technical properties of the item (e.g. the ID field)
	 * and return the created item.
	 *
	 * @returns The created item.
	 */
	public abstract createItem(item: Item): Promise<Item>;

	/**
	 * Requests an item by its ID.
	 *
	 * @throws ObjectNotFoundError if the item wasn't found.
	 *
	 * @returns The requested item.
	 */
	public abstract getItemById(id: bigint): Promise<Item>;

	/**
	 * Requests items based on the provided page configuration.
	 *
	 * @returns The page of requested items.
	 */
	public abstract getItems(pageConfig: PageConfig): Promise<Page<Item>>;

	/**
	 * Modifies an item.
	 *
	 * @throws ObjectNotFoundError if the item wasn't found.
	 *
	 * @returns The modified item.
	 */
	public abstract modifyItem(item: Item): Promise<Item>;

	/**
	 * Deletes an item.
	 *
	 * Does not throw if the item doesn't exist anymore.
	 */
	public abstract deleteItem(item: Item): Promise<void>;
}

@Injectable() // Necessary for future dependency injection, even if this class is never directly injected.
class ApiItemService extends ItemService {
	readonly #url = '/api/items/v1/regular';

	readonly #httpClient = inject(HttpClient);

	constructor() {
		super();
	}

	public override async createItem(item: Item): Promise<Item> {
		const url: string = this.#url + '/create-item';
		const body: string = ItemSerializer.serialize(item);
		const headers: HttpHeaders = this.#createHeaders();
		const options = { headers };

		const itemStream$: Observable<ItemDto> = this.#httpClient.post<ItemDto>(url, body, options);
		const itemDto: ItemDto = await executeApiCall(itemStream$);
		return zodItem().parse(itemDto);
	}

	public override async getItemById(itemId: bigint): Promise<Item> {
		const url: string = this.#url + '/get-item/' + itemId.toString();
		const itemStream$: Observable<ItemDto> = this.#httpClient.get<ItemDto>(url);
		const itemDto: ItemDto = await executeApiCall(itemStream$);
		return zodItem().parse(itemDto);
	}

	public override async getItems(pageConfig: PageConfig): Promise<Page<Item>> {
		const url: string = this.#url + '/get-items';
		const params: HttpParams = new HttpParams()
			.set('pageIndex', pageConfig.getPageIndex().toString())
			.set('pageSize', pageConfig.getPageSize().toString());
		const options = { params };

		const pageStream$: Observable<PageDto<ItemDto>> = this.#httpClient.get<PageDto<ItemDto>>(
			url,
			options
		);
		const pageDto: PageDto<ItemDto> = await executeApiCall(pageStream$);

		return zodPage(zodItem()).parse(pageDto);
	}

	public override async modifyItem(item: Item): Promise<Item> {
		const body: string = ItemSerializer.serialize(item);
		const itemId: bigint | undefined = item.getId();
		if (itemId === undefined) {
			throw new IllegalArgumentError('Item ID is undefined. Cannot modify item without ID.');
		}
		const url: string = this.#url + '/modify-item/' + itemId.toString();
		const headers: HttpHeaders = this.#createHeaders();
		const options = { headers };

		const itemStream$: Observable<ItemDto> = this.#httpClient.put<ItemDto>(url, body, options);
		const itemDto: ItemDto = await executeApiCall(itemStream$);
		return zodItem().parse(itemDto);
	}

	/*
		  Do not throw in that method, if the item doesn't exist anymore.
		 The current client might try to delete an item, that another client already removed.
	   */
	public override async deleteItem(item: Item): Promise<void> {
		const itemId: bigint | undefined = item.getId();
		if (itemId === undefined) {
			throw new IllegalArgumentError('Item ID is undefined. Cannot delete item without ID.');
		}

		const url: string = this.#url + '/delete-item/' + itemId.toString();
		const resultStream$: Observable<unknown> = this.#httpClient.delete(url);
		try {
			await executeApiCall(resultStream$);
		} catch (error: unknown) {
			if (!(error instanceof ObjectNotFoundError)) {
				throw error;
			}
		}
	}

	#createHeaders(): HttpHeaders {
		return new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
	}
}
