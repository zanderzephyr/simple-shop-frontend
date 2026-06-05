import { inject, Component } from '@angular/core';
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
import { BiConsumer } from '@utils/functional-interfaces';
import { ImageRendererConfiguration } from '@core/ui/renderer/image-renderer/image-renderer-configuration';

@Component({
  selector: 'app-inventory',
  imports: [NgMatTableComponent, MatButtonModule, MatIconModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class InventoryComponent {
  protected readonly table: Table = new DefaultTable(
    new DefaultTableModel(inventoryColumnDescriptions),
    new DefaultTableColumnModel(inventoryColumnDescriptions),
  );

  readonly #actionCallbackMap: Map<InventoryTableAction, BiConsumer<number, number>> =
    this.#createActionCallbackMap();

  public constructor() {
    this.#initTableContent();
  }

  #createActionCallbackMap(): Map<InventoryTableAction, BiConsumer<number, number>> {
    const map: Map<InventoryTableAction, BiConsumer<number, number>> = new Map<
      InventoryTableAction,
      BiConsumer<number, number>
    >();

    map.set(InventoryTableAction.MODIFY, (columnViewIndex: number, rowViewIndex: number) =>
      this.#modify(columnViewIndex, rowViewIndex),
    );
    map.set(InventoryTableAction.DELETE, (columnViewIndex: number, rowViewIndex: number) =>
      this.#delete(columnViewIndex, rowViewIndex),
    );

    // TODO Add more actions here as needed

    return map;
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
        if (columnDescription === ACTIONS) {
          row.push(this.#actionCallbackMap);
        } else if (columnDescription === COVER) {
          row.push(new ImageRendererConfiguration(item.getImageUrl()));
        } else {
          row.push(extractItemValue(item, columnDescription));
        }
      }

      this.table.getTableModel().addRow(row);
    }
  }

  protected add(): void {
    // TODO Implement add functionality
    console.log('Add action triggered');
  }

  #modify(columnViewIndex: number, rowViewIndex: number): void {
    // TODO Implement modify functionality
    console.log('Modify action triggered');
  }

  #delete(columnViewIndex: number, rowViewIndex: number): void {
    // TODO Implement delete functionality
    console.log('Delete action triggered');
  }
}
