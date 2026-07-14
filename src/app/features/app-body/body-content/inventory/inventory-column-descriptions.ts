import { TableColumnDescription } from '@ui/table/interface/table-column-description';
import { TableCellContext } from '@ui/table/interface/table-cell-context';
import { Function, Consumer, zodConsumer } from '@core/utils/functional-interfaces';
import { Item } from '@api/item/model/item';
import { StringEditorComponent } from '@ui/editor/string-editor/string-editor';
import { StringRendererComponent } from '@ui/renderer/string-renderer/string-renderer';
import { NumberEditorComponent } from '@ui/editor/number-editor/number-editor';
import { NumberRendererComponent } from '@ui/renderer/number-renderer/number-renderer';
import { ImageRendererComponent } from '@ui/renderer/image-renderer/image-renderer';
import {
  ImageRendererConfiguration,
  zodImageRendererConfiguration,
} from '@ui/renderer/image-renderer/image-renderer-configuration';
import { InventoryTableAction, zodInventoryTableAction } from './inventory-table-action';
import { InventoryTableActionEditorComponent } from './inventory-table-action-editor/inventory-table-action-editor';
import { InventoryTableActionRendererComponent } from './inventory-table-action-renderer/inventory-table-action-renderer';
import { z } from 'zod';

let modelIndex: number = 0;

export const TITLE: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Title',
  z.string(),
  StringRendererComponent,
  StringEditorComponent,
);

export const MEDIA_TYPE: TableColumnDescription<string> = new TableColumnDescription<string>(
  modelIndex++,
  'Media Type',
  z.string(),
  StringRendererComponent,
  StringEditorComponent,
);

export const STOCK: TableColumnDescription<number> = new TableColumnDescription<number>(
  modelIndex++,
  'Stock',
  z.number(),
  NumberRendererComponent,
  NumberEditorComponent,
);

export const PRICE: TableColumnDescription<number> = new TableColumnDescription<number>(
  modelIndex++,
  'Price',
  z.number(),
  NumberRendererComponent,
  NumberEditorComponent,
);

export const COVER: TableColumnDescription<ImageRendererConfiguration> =
  new TableColumnDescription<ImageRendererConfiguration>(
    modelIndex++,
    'Cover',
    zodImageRendererConfiguration(),
    ImageRendererComponent,
    undefined,
  );

export const ACTIONS: TableColumnDescription<
  Map<InventoryTableAction, Consumer<TableCellContext>>
> = new TableColumnDescription<Map<InventoryTableAction, Consumer<TableCellContext>>>(
  modelIndex++,
  'Actions',
  z.map(zodInventoryTableAction(), zodConsumer()),
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
  columnDescriptions.push(COVER);
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

  map.set(COVER, (item) => item.getImageUrl());
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
