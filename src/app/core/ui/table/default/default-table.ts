import { TableColumnModel } from '@ui/table/interface/table-column-model';
import { TableModel } from '@ui/table/interface/table-model';
import { Table } from '@ui/table/interface/table';
import { Signal } from '@angular/core';

export class DefaultTable implements Table {
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

  // TODO Make sure, multi-threading doesn't interfer with anything, e.g. when column order is changed in parallel.
  // Row reordering is not yet considered and might never be.
  public getValueAt(columnViewIndex: number, rowViewIndex: number): Signal<unknown> {
    const columnModelIndex: number =
      this.getTableColumnModel().convertToModelIndex(columnViewIndex);
    const rowModelIndex: number = rowViewIndex;
    return this.getTableModel().getValueAt(
      columnModelIndex,
      rowModelIndex,
      this.#tableColumnModel.getTableColumns()()[columnViewIndex].getTypeSchema(),
    );
  }
}
