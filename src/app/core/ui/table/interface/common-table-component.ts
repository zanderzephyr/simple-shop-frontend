import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { Table } from '@ui/table/interface/table';
import { TableColumnModel } from '@ui/table/interface/table-column-model';
import { TableModel } from '@ui/table/interface/table-model';

@Directive()
export abstract class CommonTableComponent {
	public readonly table: InputSignal<Table> = input.required<Table>();

	protected readonly tableModel: Signal<TableModel> = computed(() => this.table().getTableModel());

	protected readonly tableColumnModel: Signal<TableColumnModel> = computed(() =>
		this.table().getTableColumnModel()
	);

	public constructor() {
		// Nothing to do so far
	}
}
