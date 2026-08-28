import { Component, computed, Signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonTableComponent } from '@ui/table/interface/common-table-component';
import { TableColumn } from '@ui/table/interface/table-column';
import { createRange } from '@core/utils/array-utils';
import { NgMatTableCellComponent } from '@ui/table/ng-mat-table/ng-mat-table-cell/ng-mat-table-cell';
import { TableWidthPolicy } from '@ui/table/interface/table-width-policy';

@Component({
	selector: 'app-ng-mat-table',
	imports: [MatTableModule, NgMatTableCellComponent],
	templateUrl: './ng-mat-table.html',
	styleUrl: './ng-mat-table.scss'
})
export class NgMatTableComponent extends CommonTableComponent {
	protected readonly tableColumns: Signal<readonly TableColumn<unknown>[]> = computed(() =>
		this.tableColumnModel().getTableColumns()()
	);

	protected readonly tableColumnIds: Signal<readonly string[]> = computed(() =>
		Object.freeze(this.tableColumns().map((c) => c.getModelIndex() + ''))
	);

	protected readonly tableRowIds: Signal<readonly number[]> = computed(() => {
		const rowCount: number = this.tableModel().getRowCount()();
		return createRange(0, rowCount);
	});

	protected readonly tableColumnIdToWidth: Signal<Map<number, string | undefined>> = computed(
		() => {
			const tableWidthPolicy: TableWidthPolicy = this.tableColumnModel().getTableWidthPolicy();
			const tableColumns: readonly TableColumn<unknown>[] = this.tableColumns();

			const map: Map<number, string | undefined> = new Map<number, string>();

			for (const tableColumn of tableColumns) {
				const width: string | undefined = this.#calculateColumnWidth(tableColumn, tableWidthPolicy);
				map.set(tableColumn.getModelIndex(), width);
			}

			return map;
		}
	);

	public constructor() {
		super();
	}

	#calculateColumnWidth(
		tableColumn: TableColumn<unknown>,
		tableWidthPolicy: TableWidthPolicy
	): string | undefined {
		let width: string | undefined;

		if (tableWidthPolicy.id === TableWidthPolicy.EQUAL_SHARES.id) {
			const columnCount: number = this.tableColumns().length;
			if (columnCount > 0) {
				width = 'calc(100%/' + columnCount + ')';
			}
		} else if (tableWidthPolicy.id === TableWidthPolicy.FIXED.id) {
			width = tableColumn.getWidth();
		}

		return width;
	}
}
