import { TableColumnModel } from './table-column-model';
import { TableModel } from './table-model';

// TODO Abstraction? Any sense in that class at all?
export class Table {
  readonly #tableModel: TableModel;
  readonly #tableColumnModel: TableColumnModel;

  public constructor(tableModel: TableModel, tableColumnModel: TableColumnModel) {
    this.#tableModel = tableModel;
    this.#tableColumnModel = tableColumnModel;
  }

  public getTableModel(): TableModel {
    return this.#tableModel;
  }

  public getTableColumnModel(): TableColumnModel {
    return this.#tableColumnModel;
  }
}
