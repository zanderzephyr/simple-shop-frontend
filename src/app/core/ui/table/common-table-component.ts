import { computed, Directive, Signal, input, InputSignal } from '@angular/core';
import { TableModel } from '@core/ui/table/table-model';
import { TableColumnModel } from '@core/ui/table/table-column-model';
import { Table } from '@core/ui/table/table';

@Directive()
export abstract class CommonTableComponent {
  public readonly tableModel: InputSignal<TableModel> = input.required<TableModel>();

  public readonly tableColumnModel: InputSignal<TableColumnModel> =
    input.required<TableColumnModel>();

  protected readonly table: Signal<Table> = computed(() => {
    const tableModel: TableModel = this.tableModel();
    const tableColumnModel: TableColumnModel = this.tableColumnModel();
    return new Table(tableModel, tableColumnModel);
  });

  protected readonly tableColumnTitles: Signal<readonly string[]> = computed(() =>
    Object.freeze(
      this.tableColumnModel()
        .getTableColumns()()
        .map((c) => c.getTitle()()),
    ),
  );

  protected readonly tableColumnIds: Signal<readonly string[]> = computed(() =>
    Object.freeze(
      this.tableColumnModel()
        .getTableColumns()()
        .map((c) => c.getModelIndex() + ''),
    ),
  );

  public constructor() {
    // Nothing to do so far
  }
}
