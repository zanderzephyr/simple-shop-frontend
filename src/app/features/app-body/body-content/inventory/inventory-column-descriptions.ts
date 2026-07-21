import {
  TableColumnDescription,
  TableColumnDescriptionBuilder,
} from '@ui/table/interface/table-column-description';
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

export const TITLE: TableColumnDescription<string> = new TableColumnDescriptionBuilder<string>() //
  .setModelIndex(modelIndex++) //
  .setTitle('Title') //
  .setTypeSchema(z.string()) //
  .setRendererType(StringRendererComponent) //
  .setEditorType(StringEditorComponent) //
  .build();

export const MEDIA_TYPE: TableColumnDescription<string> =
  new TableColumnDescriptionBuilder<string>() //
    .setModelIndex(modelIndex++) //
    .setTitle('Media Type') //
    .setTypeSchema(z.string()) //
    .setRendererType(StringRendererComponent) //
    .setEditorType(StringEditorComponent) //
    .build();

export const STOCK: TableColumnDescription<number> = new TableColumnDescriptionBuilder<number>() //
  .setModelIndex(modelIndex++) //
  .setTitle('Stock') //
  .setTypeSchema(z.number()) //
  .setRendererType(NumberRendererComponent) //
  .setEditorType(NumberEditorComponent) //
  .build();

export const PRICE: TableColumnDescription<number> = new TableColumnDescriptionBuilder<number>() //
  .setModelIndex(modelIndex++) //
  .setTitle('Price') //
  .setTypeSchema(z.number()) //
  .setRendererType(NumberRendererComponent) //
  .setEditorType(NumberEditorComponent) //
  .build();

export const COVER: TableColumnDescription<ImageRendererConfiguration> =
  new TableColumnDescriptionBuilder<ImageRendererConfiguration>() //
    .setModelIndex(modelIndex++) //
    .setTitle('Cover') //
    .setTypeSchema(zodImageRendererConfiguration()) //
    .setRendererType(ImageRendererComponent) //
    .setEditorType(undefined) //
    .build();

export const ACTIONS: TableColumnDescription<
  Map<InventoryTableAction, Consumer<TableCellContext>>
> = new TableColumnDescriptionBuilder<Map<InventoryTableAction, Consumer<TableCellContext>>>() //
  .setModelIndex(modelIndex++) //
  .setTitle('Actions') //
  .setTypeSchema(z.map(zodInventoryTableAction(), zodConsumer())) //
  .setRendererType(InventoryTableActionRendererComponent) //
  .setEditorType(InventoryTableActionEditorComponent) //
  .build();

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
