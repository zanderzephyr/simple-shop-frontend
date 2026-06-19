import { Signal } from '@angular/core';
import { TableColumnModel } from './table-column-model';
import { TableModel } from './table-model';

export interface Table {
  getTableModel(): TableModel;

  getTableColumnModel(): TableColumnModel;

  getValueAt(columnViewIndex: number, rowViewIndex: number): Signal<unknown>;
}
