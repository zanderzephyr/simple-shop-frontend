import { Item } from './model/item';
import { UnsupportedOperationError } from '@core/utils/common-errors';

export class ItemSerializer {
  constructor() {
    throw new UnsupportedOperationError();
  }

  public static serialize(item: Item): string {
    // TODO The replacer argument has a "this:any" parameter. Research how this works. It looks very mysterious / magical.
    return JSON.stringify(item, ItemSerializer.#convertValueToString);
  }

  static #convertValueToString(key: string, value: unknown): unknown {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  }
}
