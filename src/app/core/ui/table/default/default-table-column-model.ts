import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { IllegalArgumentError, IllegalStateError } from '@core/utils/common-errors';
import { TableColumn } from '@ui/table/interface/table-column';
import { TableColumnDescription } from '@ui/table/interface/table-column-description';
import { TableColumnModel } from '@ui/table/interface/table-column-model';
import { TableWidthPolicy } from '@ui/table/interface/table-width-policy';
import { DefaultTableColumn } from './default-table-column';

export class DefaultTableColumnModel implements TableColumnModel {
	/**
	 * Table columns in view order.
	 */
	readonly #tableColumns: WritableSignal<TableColumn<unknown>[]>;
	readonly #tableColumnsPublic: Signal<readonly TableColumn<unknown>[]> = computed(() => {
		const copy: TableColumn<unknown>[] = [...this.#tableColumns()];
		return Object.freeze(copy);
	});

	#tableWidthPolicy: TableWidthPolicy = TableWidthPolicy.EQUAL_SHARES;

	public constructor(columnDescriptions: readonly TableColumnDescription<unknown>[]) {
		this.#tableColumns = signal(this.#createTableColumns(columnDescriptions));
	}

	#createTableColumns(
		columnDescriptions: readonly TableColumnDescription<unknown>[]
	): TableColumn<unknown>[] {
		const columns: TableColumn<unknown>[] = [];

		for (const columnDescription of columnDescriptions) {
			columns.push(new DefaultTableColumn<unknown>(columnDescription));
		}

		return columns;
	}

	public getTableColumns(): Signal<readonly TableColumn<unknown>[]> {
		return this.#tableColumnsPublic;
	}

	public changeColumnOrder(fromViewIndex: number, toViewIndex: number): this {
		this.#validateViewIndex(fromViewIndex);
		this.#validateViewIndex(toViewIndex);

		this.#tableColumns.update((tableColumns) => {
			const removedColumns: TableColumn<unknown>[] = tableColumns.splice(fromViewIndex, 1);
			tableColumns.splice(toViewIndex, 0, removedColumns[0]);
			return tableColumns;
		});

		return this;
	}

	public convertToModelIndex(columnViewIndex: number): number {
		this.#validateViewIndex(columnViewIndex);
		return this.#tableColumns()[columnViewIndex].getModelIndex();
	}

	public convertToViewIndex(columnModelIndex: number): number {
		const columns: TableColumn<unknown>[] = [...this.#tableColumns()];
		const column: TableColumn<unknown> = this.#getColumnViaModelIndex(columnModelIndex, columns);
		for (let i: number = 0; i < columns.length; i++) {
			if (column.getModelIndex() === columns[i].getModelIndex()) {
				return i;
			}
		}

		// can't happen - we previously found it. Just for the compiler.
		throw new IllegalStateError('Column wasn\'t found!');
	}

	#getColumnViaModelIndex(
		columnModelIndex: number,
		columns: TableColumn<unknown>[]
	): TableColumn<unknown> {
		for (const column of columns) {
			if (column.getModelIndex() === columnModelIndex) {
				return column;
			}
		}
		throw new IllegalArgumentError('Column model index doesn\'t exist: ' + columnModelIndex);
	}

	#validateViewIndex(columnViewIndex: number): void {
		if (columnViewIndex < 0 || columnViewIndex >= this.#tableColumns().length) {
			throw new IllegalArgumentError('Indexes out of range: ' + columnViewIndex);
		}
	}

	public getTableWidthPolicy(): TableWidthPolicy {
		return this.#tableWidthPolicy;
	}

	public setTableWidthPolicy(tableWidthPolicy: TableWidthPolicy): this {
		this.#tableWidthPolicy = tableWidthPolicy;

		return this;
	}
}
