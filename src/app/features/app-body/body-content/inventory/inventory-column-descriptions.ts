import { TableColumnDescription } from '@app/core/ui/table/table-column-description';
import { Function } from '@core/utils/functional-interfaces';
import { Item } from '@core/api/item/model/item';
import { InventoryTableActionComponent } from './inventory-table-action/inventory-table-action';

let modelIndex: number = 0;

export const TITLE: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Title',
  'string',
);

export const MEDIA_TYPE: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Media Type',
  'string',
);

export const STOCK: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Stock',
  'string',
);

export const PRICE: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Price',
  'string',
);

export const IMAGE_URL: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Image URL',
  'string',
);

export const ACTIONS: TableColumnDescription<InventoryTableActionComponent> =
  new TableColumnDescription<InventoryTableActionComponent>(
    modelIndex++,
    'Actions',
    InventoryTableActionComponent,
  );

export const inventoryColumnDescriptions: readonly TableColumnDescription<unknown>[] =
  createColumnDescriptions();

function createColumnDescriptions(): readonly TableColumnDescription<unknown>[] {
  const columnDescriptions: TableColumnDescription<unknown>[] = [];

  columnDescriptions.push(TITLE);
  columnDescriptions.push(MEDIA_TYPE);
  columnDescriptions.push(STOCK);
  columnDescriptions.push(PRICE);
  columnDescriptions.push(IMAGE_URL);
  columnDescriptions.push(ACTIONS);
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
): unknown | undefined {
  const itemValueExtractor: Function<Item, unknown> | undefined =
    columnDescriptionToItemValueExtractor.get(columnDescription);
  return itemValueExtractor ? itemValueExtractor(item) : undefined;
}
