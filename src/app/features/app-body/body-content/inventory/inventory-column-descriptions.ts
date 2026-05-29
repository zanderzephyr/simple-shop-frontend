import { TableColumnDescription } from '@app/core/ui/table/table-column-description';
import { StringFormatter } from '@app/core/utils/formatter';
import { Function } from '@core/utils/functional-interfaces';
import { Item } from '@core/api/item/model/item';
import { ItemAction } from './item-actions';

let modelIndex: number = 0;

export const TITLE: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Title',
  new StringFormatter(),
);

// TODO Some kind of enum formatter
export const MEDIA_TYPE: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Media Type',
  new StringFormatter(),
);

// TODO Number formatter
export const STOCK: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Stock',
  new StringFormatter(),
);

// TODO Number formatter
export const PRICE: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Price',
  new StringFormatter(),
);

export const IMAGE_URL: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Image URL',
  new StringFormatter(),
);

export const ACTIONS: TableColumnDescription<ItemAction[]> = new TableColumnDescription<
  ItemAction[]
>(modelIndex++, 'Actions', undefined);

export const inventoryColumnDescriptions: readonly TableColumnDescription<unknown>[] =
  createColumnDescriptions();

function createColumnDescriptions(): readonly TableColumnDescription<unknown>[] {
  const columnDescriptions: TableColumnDescription<unknown>[] = [];

  columnDescriptions.push(TITLE);
  columnDescriptions.push(MEDIA_TYPE);
  columnDescriptions.push(STOCK);
  columnDescriptions.push(PRICE);
  columnDescriptions.push(IMAGE_URL);

  return Object.freeze(columnDescriptions);
}

const columnDescriptionToItemValueExtractor: Map<
  TableColumnDescription<unknown>,
  Function<Item, unknown>
> = createColumnDescriptionToItemValueExtractorMap();

function createColumnDescriptionToItemValueExtractorMap(): Map<
  TableColumnDescription<unknown>,
  Function<Item, unknown>
> {
  const map: Map<TableColumnDescription<unknown>, Function<Item, unknown>> = new Map<
    TableColumnDescription<unknown>,
    Function<Item, unknown>
  >();

  map.set(IMAGE_URL, (item) => item.getImageUrl());
  map.set(MEDIA_TYPE, (item) => item.getMediaType().name);
  map.set(PRICE, (item) => item.getPrice());
  map.set(STOCK, (item) => item.getStock());
  map.set(TITLE, (item) => item.getTitle());

  return map;
}

export function extractItemValue(
  item: Item,
  columnDescription: TableColumnDescription<unknown>,
): unknown {
  return columnDescriptionToItemValueExtractor.get(columnDescription)!(item);
}
