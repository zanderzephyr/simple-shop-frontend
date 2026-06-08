import { Signal } from '@angular/core';
import { ZodType } from 'zod';

// TODO Add removeRow
export interface TableModel {
  getColumnCount(): Signal<number>;

  getRowCount(): Signal<number>;

  addRow(row: unknown[]): this;

  removeRow(rowModelIndex: number): this;

  /**
   * Throws an IndexOutOfBoundsError when the given table coordinates don't exist.
   * * Throws an IllegalArgumentError, when the columnType isn't the actual type of the column.
   */
  getValueAt<T>(columnModelIndex: number, rowModelIndex: number, columnType: ZodType<T>): Signal<T>;

  /**
   * Throws an IndexOutOfBoundsError when the given table coordinates don't exist.
   * Throws an IllegalArgumentError, when the value to set doesn't have the type of the column.
   */
  setValueAt(value: unknown, columnModelIndex: number, rowModelIndex: number): this;

  /**
   * Throws an IndexOutOfBoundsError when the given table coordinates don't exist.
   */
  isCellEditable(columnModelIndex: number, rowModelIndex: number): boolean;

  clear(): void;
}
