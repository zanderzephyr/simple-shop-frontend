import { TableColumn } from './table-column';
import { TableWidthPolicy } from './table-width-policy';
import { Signal } from '@angular/core';

// TODO Enable user specific table column ordering (e.g. via column header dragging)
export interface TableColumnModel {
	/**
	 * Returns all columns in view order.
	 */
	getTableColumns(): Signal<readonly TableColumn<unknown>[]>;

	/**
	 * Moves a column from its current position to a new position.
	 */
	changeColumnOrder(currentColumnViewIndex: number, newColumnViewIndex: number): this;

	convertToModelIndex(columnViewIndex: number): number;

	convertToViewIndex(columnModelIndex: number): number;

	getTableWidthPolicy(): TableWidthPolicy;
}
