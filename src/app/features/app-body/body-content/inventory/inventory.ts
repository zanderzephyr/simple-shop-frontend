import { Component } from '@angular/core';
import { inventoryColumnDescriptions } from './inventory-column-descriptions';
import { NgMatTableComponent } from '@core/ui/table/ng-mat-table/ng-mat-table';
import { TableModel } from '@core/ui/table/table-model';
import { DefaultTableModel } from '@core/ui/table/default-table-model';
import { TableColumnModel } from '@core/ui/table/table-column-model';
import { DefaultTableColumnModel } from '@core/ui/table/default-table-column-model';
import { Table } from '@core/ui/table/table';

@Component({
  selector: 'app-inventory',
  imports: [NgMatTableComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class InventoryComponent {
  protected readonly table: Table = new Table(
    new DefaultTableModel(inventoryColumnDescriptions),
    new DefaultTableColumnModel(inventoryColumnDescriptions),
  );

  public constructor() {
    // Nothing to do so far

    this.table.getTableModel().addRow(['HP1', 'Book', 5, 19.99, 'bla.com']);
  }
}
