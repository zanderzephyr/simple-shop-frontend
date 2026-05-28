import { TableColumn } from './table-column';
import { Signal } from '@angular/core';

// TODO Enable user specific table column ordering (e.g. via column header dragging)
export interface TableColumnModel {
  getTableColumns(): Signal<readonly TableColumn<unknown>[]>;
}
