import { Component } from '@angular/core';
import { inventoryColumnDescriptions } from './inventory-column-descriptions';
import { NgMatTableComponent } from '@core/ui/table/ng-mat-table/ng-mat-table';
import { DefaultTableModel } from '@core/ui/table/default-table-model';
import { DefaultTableColumnModel } from '@core/ui/table/default-table-column-model';
import { Table } from '@core/ui/table/table';
import { DefaultTable } from '@core/ui/table/default-table';

@Component({
  selector: 'app-inventory',
  imports: [NgMatTableComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class InventoryComponent {
  protected readonly table: Table = new DefaultTable(
    new DefaultTableModel(inventoryColumnDescriptions),
    new DefaultTableColumnModel(inventoryColumnDescriptions),
  );

  public constructor() {
    // Nothing to do so far

    // Just for testing
    this.table.getTableModel().addRow(['HP1', 'Book', 5, 19.99, 'bla.com']);
  }
}
