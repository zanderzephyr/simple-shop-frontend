import { Injectable } from '@angular/core';
import { Item } from '@api/item/model/item';
import { Page } from '@core/utils/page/page';
import { PageConfig } from '@core/utils/page/page-config';

@Injectable()
export abstract class ItemService {
	protected constructor() {
		// Nothing to do so far
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
