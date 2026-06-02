import { TableColumnDescription } from '@app/core/ui/table/table-column-description';
import { Function, BiConsumer } from '@core/utils/functional-interfaces';
import { Item } from '@core/api/item/model/item';
import { StringEditorComponent } from '@app/core/ui/editor/string-editor/string-editor';
import { StringRendererComponent } from '@app/core/ui/renderer/string-renderer/string-renderer';
import { NumberEditorComponent } from '@app/core/ui/editor/number-editor/number-editor';
import { NumberRendererComponent } from '@app/core/ui/renderer/number-renderer/number-renderer';
import { InventoryTableAction } from './inventory-table-action';
import { InventoryTableActionEditorComponent } from './inventory-table-action-editor/inventory-table-action-editor';
import { InventoryTableActionRendererComponent } from './inventory-table-action-renderer/inventory-table-action-renderer';

let modelIndex: number = 0;

export const TITLE: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Title',
  'string',
  StringRendererComponent,
  StringEditorComponent,
);

export const MEDIA_TYPE: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Media Type',
  'string',
  StringRendererComponent,
  StringEditorComponent,
);

export const STOCK: TableColumnDescription<number> = new TableColumnDescription<number>(
  modelIndex++,
  'Stock',
  'number',
  NumberRendererComponent,
  NumberEditorComponent,
);

export const PRICE: TableColumnDescription<number> = new TableColumnDescription<number>(
  modelIndex++,
  'Price',
  'number',
  NumberRendererComponent,
  NumberEditorComponent,
);

export const IMAGE_URL: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Image URL',
  'string',
  StringRendererComponent,
  StringEditorComponent,
);

export const ACTIONS: TableColumnDescription<
  Map<InventoryTableAction, BiConsumer<number, number>>
> = new TableColumnDescription<Map<InventoryTableAction, BiConsumer<number, number>>>(
  modelIndex++,
  'Actions',
  Map<InventoryTableAction, BiConsumer<number, number>>,
  InventoryTableActionRendererComponent,
  InventoryTableActionEditorComponent,
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
