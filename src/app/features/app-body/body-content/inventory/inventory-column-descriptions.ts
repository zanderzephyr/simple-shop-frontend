import { TableColumnDescription } from '@app/core/ui/table/table-column-description';
import { StringFormatter } from '@app/core/utils/formatter';

export const inventoryColumnDescriptions: readonly TableColumnDescription<unknown>[] =
  createColumnDescriptions();

function createColumnDescriptions(): readonly TableColumnDescription<unknown>[] {
  const columnDescriptions: TableColumnDescription<unknown>[] = [];

  let modelIndex: number = 0;

  columnDescriptions.push(new TableColumnDescription(modelIndex++, 'Title', new StringFormatter()));

  // TODO Some kind of enum formatter
  columnDescriptions.push(
    new TableColumnDescription(modelIndex++, 'Media Type', new StringFormatter()),
  );

  // TODO Number formatter
  columnDescriptions.push(new TableColumnDescription(modelIndex++, 'Stock', new StringFormatter()));

  // TODO Number formatter
  columnDescriptions.push(new TableColumnDescription(modelIndex++, 'Price', new StringFormatter()));

  columnDescriptions.push(
    new TableColumnDescription(modelIndex++, 'Image URL', new StringFormatter()),
  );

  return Object.freeze(columnDescriptions);
}
