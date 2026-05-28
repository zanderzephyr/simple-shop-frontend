import { Component } from '@angular/core';
import { inventoryColumnDescriptions } from './inventory-column-descriptions';
import { NgMatTableComponent } from '@core/ui/table/ng-mat-table/ng-mat-table';
import { TableModel } from '@core/ui/table/table-model';
import { DefaultTableModel } from '@core/ui/table/default-table-model';
import { TableColumnModel } from '@core/ui/table/table-column-model';
import { DefaultTableColumnModel } from '@core/ui/table/default-table-column-model';

@Component({
  selector: 'app-inventory',
  imports: [NgMatTableComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class InventoryComponent {
  readonly #tableModel: TableModel = new DefaultTableModel(inventoryColumnDescriptions);

  readonly #tableColumnModel: TableColumnModel = new DefaultTableColumnModel(
    inventoryColumnDescriptions,
  );

  public constructor() {
    // Nothing to do so far
  }

  protected getTableModel(): TableModel {
    return this.#tableModel;
  }

  protected getTableColumnModel(): TableColumnModel {
    return this.#tableColumnModel;
  }
}
