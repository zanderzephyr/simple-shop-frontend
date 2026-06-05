import { computed, Directive, Signal, input, InputSignal } from '@angular/core';
import { TableModel } from '@app/core/ui/table/interface/table-model';
import { TableColumnModel } from '@app/core/ui/table/interface/table-column-model';
import { Table } from '@app/core/ui/table/interface/table';

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
