import { computed, WritableSignal, Signal, signal } from '@angular/core';
import { TableModel } from '@ui/table/interface/table-model';
import { IllegalArgumentError, IndexOutOfBoundsError } from '@utils/common-errors';
import { TableColumnDescription } from '@ui/table/interface/table-column-description';
import { ZodType, ZodSafeParseResult } from 'zod';

export class DefaultTableModel implements TableModel {
  readonly #tableData: WritableSignal<WritableSignal<unknown>[][]> = signal([]);

  readonly #columnCount: Signal<number> = computed(() => this.#tableData().length);

  readonly #rowCount: Signal<number> = computed(() => {
    if (this.#columnCount() > 0) {
      return this.#tableData()[0].length;
    }
    return 0;
  });

  readonly #columnTypeSchemas: ZodType<unknown>[] = [];

  public constructor(columnDescriptions: readonly TableColumnDescription<unknown>[]) {
    for (const columnDescription of columnDescriptions) {
      this.#columnTypeSchemas.push(columnDescription.getTypeSchema());

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
    this.#validateRow(row);

    this.#tableData.update((tableData) => {
      for (let i: number = 0; i < row.length; i++) {
        tableData[i].push(signal(row[i]));
      }
      return tableData;
    });

    return this;
  }

  public removeRow(rowModelIndex: number): this {
    this.#validateRowIndex(rowModelIndex);

    this.#tableData.update((tableData) => {
      for (let columnIndex: number = 0; columnIndex < tableData.length; columnIndex++) {
        const column: unknown[] = tableData[columnIndex];
        column.splice(rowModelIndex, 1);
      }
      return tableData;
    });

    return this;
  }

  public getValueAt<T>(
    columnModelIndex: number,
    rowModelIndex: number,
    columnTypeSchema: ZodType<T>,
  ): Signal<T> {
    this.#validateCoordinates(columnModelIndex, rowModelIndex);

    const rawValue: Signal<unknown> = this.#tableData()[columnModelIndex][rowModelIndex];
    const parsingResult: ZodSafeParseResult<T> = this.#parseValue(rawValue(), columnTypeSchema);
    this.#validateParsingResult(parsingResult);
    return rawValue as Signal<T>;
  }

  public setValueAt(value: unknown, columnModelIndex: number, rowModelIndex: number): this {
    this.#validateCoordinates(columnModelIndex, rowModelIndex);

    const columnTypeSchema: ZodType<unknown> = this.#columnTypeSchemas[columnModelIndex];
    const parsingResult: ZodSafeParseResult<unknown> = this.#parseValue(value, columnTypeSchema);
    this.#validateParsingResult(parsingResult);

    this.#tableData()[columnModelIndex][rowModelIndex].update(() => value);

    return this;
  }

  // TODO Implement
  public isCellEditable(columnModelIndex: number, rowModelIndex: number): boolean {
    this.#validateCoordinates(columnModelIndex, rowModelIndex);

    return false;
  }

  clear(): void {
    this.#tableData.update(() => []);
  }

  #validateRow(row: unknown[]): void {
    this.#validateRowCount(row);
    this.#validateRowTypes(row);
  }

  #validateRowCount(row: unknown[]): void {
    if (this.#columnCount() !== row.length) {
      throw new IllegalArgumentError(
        'The number of columns of a row to be added has to be equal to the number of columns of this table!',
      );
    }
  }

  #validateRowTypes(row: unknown[]): void {
    for (let i: number = 0; i < row.length; i++) {
      const parsingResult: ZodSafeParseResult<unknown> = this.#parseValue(
        row[i],
        this.#columnTypeSchemas[i],
      );
      this.#validateParsingResult(parsingResult);
    }
  }

  #validateParsingResult(parsingResult: ZodSafeParseResult<unknown>): void {
    if (!parsingResult.success) {
      throw new IllegalArgumentError("Value and type don't match!");
    }
  }

  #parseValue<T>(value: unknown, columnTypeSchema: ZodType<T>): ZodSafeParseResult<T> {
    return columnTypeSchema.safeParse(value);
  }

  #validateCoordinates(columnModelIndex: number, rowModelIndex: number): void {
    this.#validateColumnIndex(columnModelIndex);
    this.#validateRowIndex(rowModelIndex);
  }

  #validateColumnIndex(columnModelIndex: number): void {
    if (columnModelIndex < 0 || columnModelIndex >= this.#columnCount()) {
      throw new IndexOutOfBoundsError('Invalid column index ' + columnModelIndex + '!');
    }
  }

  #validateRowIndex(rowModelIndex: number): void {
    if (rowModelIndex < 0 || rowModelIndex >= this.#rowCount()) {
      throw new IndexOutOfBoundsError('Invalid row index ' + rowModelIndex + '!');
    }
  }
}
