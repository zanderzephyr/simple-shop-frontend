export interface TableModel {
  getColumnCount(): number;

  getRowCount(): number;

  /**
   * Throws an IndexOutOfBoundsError when the given table coordinates don't exist.
   */
  getValueAt(columnIndex: number, rowIndex: number): unknown;

  /**
   * Throws an IndexOutOfBoundsError when the given table coordinates don't exist.
   */
  setValueAt(value: unknown, columnIndex: number, rowIndex: number): this;

  /**
   * Throws an IndexOutOfBoundsError when the given table coordinates don't exist.
   */
  isCellEditable(columnIndex: number, rowIndex: number): boolean;
}
