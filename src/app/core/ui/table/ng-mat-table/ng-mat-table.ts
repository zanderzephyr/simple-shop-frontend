import { computed, Signal, Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonTableComponent } from '@core/ui/table/interface/common-table-component';
import { TableColumn } from '@core/ui/table/interface/table-column';
import { createRange } from '@utils/array-utils';
import { NgMatTableCellComponent } from '@core/ui/table/ng-mat-table/ng-mat-table-cell/ng-mat-table-cell';

@Component({
  selector: 'app-ng-mat-table',
  imports: [MatTableModule, NgMatTableCellComponent],
  templateUrl: './ng-mat-table.html',
  styleUrl: './ng-mat-table.css',
})
export class NgMatTableComponent extends CommonTableComponent {
  protected readonly tableColumns: Signal<readonly TableColumn<unknown>[]> = computed(() =>
    this.tableColumnModel().getTableColumns()(),
  );

  protected readonly tableColumnIds: Signal<readonly string[]> = computed(() =>
    Object.freeze(this.tableColumns().map((c) => c.getModelIndex() + '')),
  );

  protected readonly tableRowIds: Signal<readonly number[]> = computed(() => {
    const rowCount: number = this.tableModel().getRowCount()();
    return createRange(0, rowCount);
  });

  public constructor() {
    super();
  }
}
