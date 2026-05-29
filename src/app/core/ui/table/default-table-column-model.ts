import { TableColumnModel } from './table-column-model';
import { TableColumnDescription } from './table-column-description';
import { TableColumn } from './table-column';
import { DefaultTableColumn } from './default-table-column';
import { Signal, signal } from '@angular/core';

export class DefaultTableColumnModel implements TableColumnModel {
  #tableColumns: Signal<readonly TableColumn<unknown>[]>;

  public constructor(columnDescriptions: readonly TableColumnDescription<unknown>[]) {
    this.#tableColumns = signal(this.#createTableColumns(columnDescriptions)).asReadonly();
  }

  #createTableColumns(
    columnDescriptions: readonly TableColumnDescription<unknown>[],
  ): readonly TableColumn<unknown>[] {
    const columns: TableColumn<unknown>[] = [];

    for (const columnDescription of columnDescriptions) {
      columns.push(new DefaultTableColumn<unknown>(columnDescription));
    }

    return Object.freeze(columns);
  }

  public getTableColumns(): Signal<readonly TableColumn<unknown>[]> {
    return this.#tableColumns;
  }
}
