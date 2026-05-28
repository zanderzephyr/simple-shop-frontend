import { TableModel } from './table-model';
import { IllegalArgumentError, IndexOutOfBoundsError } from '@core/utils/common-errors';
import { TableColumnDescription } from './table-column-description';

export class DefaultTableModel implements TableModel {
  #tableData: unknown[][] = [[]];

  public constructor(columnDescriptions: readonly TableColumnDescription<unknown>[]) {
    for (const columnDescription of columnDescriptions) {
      this.#tableData.push([]);
    }
  }

  getColumnCount(): number {
    return this.#tableData.length;
  }

  getRowCount(): number {
    if (this.#tableData.length > 0) {
      return this.#tableData[0].length;
    }
    return 0;
  }

  public addRow(row: unknown[]): this {
    if (this.#tableData.length === row.length) {
      this.#tableData.push(row);
    } else {
      throw new IllegalArgumentError(
        'The number of columns of a row to be added has to be equal to the number of columns of this table!',
      );
    }
    return this;
  }

  getValueAt(columnIndex: number, rowIndex: number): unknown {
    if (this.#tableData.length > columnIndex) {
      const column: unknown[] = this.#tableData[columnIndex];
      if (column.length > rowIndex) {
        return column[rowIndex];
      }
    }
    this.#throwCoordinateError(columnIndex, rowIndex);
    return null; // doesn't happen
  }

  setValueAt(value: unknown, columnIndex: number, rowIndex: number): this {
    if (this.#tableData.length > columnIndex) {
      const column: unknown[] = this.#tableData[columnIndex];
      if (column.length > rowIndex) {
        column[rowIndex] = value;
        return this;
      }
    }
    this.#throwCoordinateError(columnIndex, rowIndex);
    return this; // doesn't happen
  }

  isCellEditable(columnIndex: number, rowIndex: number): boolean {
    if (this.#tableData.length > columnIndex) {
      const column: unknown[] = this.#tableData[columnIndex];
      if (column.length > rowIndex) {
        return false;
      }
    }
    this.#throwCoordinateError(columnIndex, rowIndex);
    return false; // doesn't happen
  }

  #throwCoordinateError(columnIndex: number, rowIndex: number): void {
    throw new IndexOutOfBoundsError(
      'Table has no element at (' + columnIndex + ',' + rowIndex + ')!',
    );
  }
}
