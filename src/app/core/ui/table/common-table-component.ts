import { computed, Directive, Signal, input, InputSignal } from '@angular/core';
import { TableModel } from '@core/ui/table/table-model';
import { TableColumnModel } from '@core/ui/table/table-column-model';
import { Table } from '@core/ui/table/table';

@Directive()
export abstract class CommonTableComponent {
  public readonly table: InputSignal<Table> = input.required<Table>();

  protected readonly tableModel: Signal<TableModel> = computed(() => this.table().getTableModel());

  protected readonly tableColumnModel: Signal<TableColumnModel> = computed(() =>
    this.table().getTableColumnModel(),
  );

  public constructor() {
    // Nothing to do so far
  }
}
