import { computed, WritableSignal, Signal, signal } from '@angular/core';
import { TableModel } from './table-model';
import { IllegalArgumentError, IndexOutOfBoundsError } from '@core/utils/common-errors';
import { TableColumnDescription } from './table-column-description';

export class DefaultTableModel implements TableModel {
  readonly #tableData: WritableSignal<WritableSignal<unknown>[][]> = signal([]);
  readonly #columnCount: Signal<number> = computed(() => this.#tableData().length);
  readonly #rowCount: Signal<number> = computed(() => {
    if (this.#columnCount() > 0) {
      return this.#tableData()[0].length;
    }
    return 0;
  });

  public constructor(columnDescriptions: readonly TableColumnDescription<unknown>[]) {
    for (const columnDescription of columnDescriptions) {
      this.#tableData.update((d) => {
        d.push([]);
        return d;
      });
    }
  }

  public getColumnCount(): Signal<number> {
    return this.#columnCount;
  }

  public getRowCount(): Signal<number> {
    return this.#rowCount;
  }

  // TODO Do we have to create a copy of row to be safe from outside manipulation?
  public addRow(row: unknown[]): this {
    if (this.#columnCount() !== row.length) {
      throw new IllegalArgumentError(
        'The number of columns of a row to be added has to be equal to the number of columns of this table!',
      );
    }

    this.#tableData.update((tableData) => {
      for (let i: number = 0; i < row.length; i++) {
        tableData[i].push(signal(row[i]));
      }
      return tableData;
    });

    return this;
  }

  public getValueAt(columnModelIndex: number, rowModelIndex: number): Signal<unknown> {
    this.#validateCoordinates(columnModelIndex, rowModelIndex);

    return this.#tableData()[columnModelIndex][rowModelIndex];
  }

  public setValueAt(value: unknown, columnModelIndex: number, rowModelIndex: number): this {
    this.#validateCoordinates(columnModelIndex, rowModelIndex);

    this.#tableData()[columnModelIndex][rowModelIndex].update(() => value);

    return this;
  }

  // TODO Implement
  public isCellEditable(columnModelIndex: number, rowModelIndex: number): boolean {
    this.#validateCoordinates(columnModelIndex, rowModelIndex);

    return false;
  }

  #validateCoordinates(columnModelIndex: number, rowModelIndex: number): void {
    if (columnModelIndex < 0 || columnModelIndex >= this.#columnCount()) {
      throw new IndexOutOfBoundsError('Invalid column index ' + columnModelIndex + '!');
    }

    if (rowModelIndex < 0 || rowModelIndex >= this.#rowCount()) {
      throw new IndexOutOfBoundsError('Invalid row index ' + rowModelIndex + '!');
    }
  }

  clear(): void {
    this.#tableData.update(() => []);
  }
}
