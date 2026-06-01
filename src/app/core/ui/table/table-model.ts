import { Signal } from '@angular/core';

// TODO Add removeRow
export interface TableModel {
  getColumnCount(): Signal<number>;

  getRowCount(): Signal<number>;

  addRow(row: unknown[]): this;

  /**
   * Throws an IndexOutOfBoundsError when the given table coordinates don't exist.
   */
  getValueAt(columnModelIndex: number, rowModelIndex: number): Signal<unknown>;

  /**
   * Throws an IndexOutOfBoundsError when the given table coordinates don't exist.
   */
  setValueAt(value: unknown, columnModelIndex: number, rowModelIndex: number): this;

  /**
   * Throws an IndexOutOfBoundsError when the given table coordinates don't exist.
   */
  isCellEditable(columnModelIndex: number, rowModelIndex: number): boolean;

  clear(): void;
}
