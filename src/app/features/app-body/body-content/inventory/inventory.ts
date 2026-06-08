import { signal, WritableSignal, inject, Component } from '@angular/core';
import {
  inventoryColumnDescriptions,
  extractItemValue,
  ACTIONS,
  COVER,
} from './inventory-column-descriptions';
import { NgMatTableComponent } from '@core/ui/table/ng-mat-table/ng-mat-table';
import { DefaultTableModel } from '@app/core/ui/table/default/default-table-model';
import { DefaultTableColumnModel } from '@app/core/ui/table/default/default-table-column-model';
import { Table } from '@app/core/ui/table/interface/table';
import { DefaultTable } from '@app/core/ui/table/default/default-table';
import { ItemService } from '@app/core/api/item/item-service';
import { Item } from '@app/core/api/item/model/item';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InventoryTableAction } from './inventory-table-action';
import { InventoryTableActionCallback } from './inventory-table-action-callback';
import { ImageRendererConfiguration } from '@core/ui/renderer/image-renderer/image-renderer-configuration';

@Component({
  selector: 'app-inventory',
  imports: [NgMatTableComponent, MatButtonModule, MatIconModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class InventoryComponent {
  /*
		TODO Deal with the item service properly. For now, I completely work around this,
		until the details of the backend are specified. The item service for now is simply
		an initial test data supplier. We don't keep it up to date and we don't receive
		updates from it.
		
		Consider how to deal with a big amount of items, how to keep it in synch with the backend and so on.
		Make sure, the table activities don't break that synching approach.
		Maybe deal with huge amounts of data by having a size limited table with configurable size
		and switching through table pages, as is done very often in many applications?

		How should we deal with item service updates? They could be full table updates
		or iteratively / step by step modifications, we could process. Full table updates
		would probably be less efficient.
	*/
  readonly #itemService: ItemService = inject(ItemService);

  protected readonly table: Table = new DefaultTable(
    new DefaultTableModel(inventoryColumnDescriptions),
    new DefaultTableColumnModel(inventoryColumnDescriptions),
  );

  public constructor() {
    this.#initTableContent();
  }

  async #initTableContent(): Promise<void> {
    const items: readonly Item[] = await this.#itemService.getItems();
    for (const item of items) {
      const row: unknown[] = [];

      for (const columnDescription of inventoryColumnDescriptions) {
        if (columnDescription === ACTIONS) {
          row.push(this.#createActionCallbackMap(item));
        } else if (columnDescription === COVER) {
          row.push(new ImageRendererConfiguration(item.getImageUrl()));
        } else {
          row.push(extractItemValue(item, columnDescription));
        }
      }

      this.table.getTableModel().addRow(row);
    }
  }

  #createActionCallbackMap(item: Item): Map<InventoryTableAction, InventoryTableActionCallback> {
    const map: Map<InventoryTableAction, InventoryTableActionCallback> = new Map<
      InventoryTableAction,
      InventoryTableActionCallback
    >();

    map.set(InventoryTableAction.MODIFY, new InventoryTableActionCallback(item, this.#modify));
    map.set(InventoryTableAction.DELETE, new InventoryTableActionCallback(item, this.#delete));

    return map;
  }
  protected add(): void {
    // TODO Implement add functionality
    console.log('Add action triggered');
  }

  #modify(item: Item): void {
    // TODO Implement modify functionality
    console.log('Modify action triggered');
  }

  #delete(item: Item): void {
    console.log('Delete action triggered');
    /*
			TODO Match items properly. Maybe with an own table model,
		 	that stores the actual items as well or instead of the default
		 	table model matrix?
		 */
    // TODO Remove item from item service and table model, if item service is not reactive with our frontend.
  }
}
