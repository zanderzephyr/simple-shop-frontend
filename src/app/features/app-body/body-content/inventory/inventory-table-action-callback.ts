import { Item } from '@core/api/item/model/item';
import { Consumer } from '@utils/functional-interfaces';
import { z, ZodType } from 'zod';

export class InventoryTableActionCallback {
  readonly #item: Item;

  readonly #callback: Consumer<Item>;

  public constructor(item: Item, callback: Consumer<Item>) {
    this.#item = item;
    this.#callback = callback;
  }

  public execute(): void {
    this.#callback(this.#item);
  }
}

export function zodInventoryTableActionCallback(): ZodType<InventoryTableActionCallback> {
  return z.instanceof(InventoryTableActionCallback);
}
