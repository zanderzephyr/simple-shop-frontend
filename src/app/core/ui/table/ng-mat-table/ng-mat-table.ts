import { computed, Signal, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CommonTableComponent } from '../common-table-component';
import { TableColumn } from '@core/ui/table/table-column';
import { createRange } from '@core/utils/array-utils';

@Component({
  selector: 'app-ng-mat-table',
  imports: [CommonModule, MatTableModule],
  templateUrl: './ng-mat-table.html',
  styleUrl: './ng-mat-table.css',
})
export class NgMatTableComponent extends CommonTableComponent {
  protected readonly tableColumns: Signal<readonly TableColumn<unknown>[]> = computed(() =>
    this.tableColumnModel().getTableColumns()(),
  );

  protected readonly tableColumnIds: Signal<readonly string[]> = computed(() =>
    Object.freeze(
      this.tableColumnModel()
        .getTableColumns()()
        .map((c) => c.getModelIndex() + ''),
    ),
  );

  protected readonly tableRowIds: Signal<readonly number[]> = computed(() => {
    const rowCount: number = this.tableModel().getRowCount()();
    return createRange(0, rowCount);
  });

  public constructor() {
    super();
  }
}
