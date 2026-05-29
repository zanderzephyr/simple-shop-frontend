import { inject, Component } from '@angular/core';
import { inventoryColumnDescriptions, extractItemValue } from './inventory-column-descriptions';
import { NgMatTableComponent } from '@core/ui/table/ng-mat-table/ng-mat-table';
import { DefaultTableModel } from '@core/ui/table/default-table-model';
import { DefaultTableColumnModel } from '@core/ui/table/default-table-column-model';
import { Table } from '@core/ui/table/table';
import { DefaultTable } from '@core/ui/table/default-table';
import { ItemService } from '@app/core/api/item/item-service';
import { Item } from '@app/core/api/item/model/item';

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
    this.#initTableContent();
  }

  /*
		TODO This should look a bit different when dealing with an actual service.
		Not completely sure yet how, though. In the end, the service should keep
		us up-to-date over time with any mechanism that seems appropriate.

		TODO In a real scenario, there might be a huge amount of items. How should this
		be dealt with? A size limited table with configurable size and switching through
		table pages?
	*/
  async #initTableContent(): Promise<void> {
    const itemService: ItemService = inject(ItemService);
    const items: readonly Item[] = await itemService.getItems();

    for (const item of items) {
      const row: unknown[] = [];

      for (const columnDescription of inventoryColumnDescriptions) {
        // Column description iteration order is table model order
        row.push(extractItemValue(item, columnDescription));
      }

      this.table.getTableModel().addRow(row);
    }
  }
}
