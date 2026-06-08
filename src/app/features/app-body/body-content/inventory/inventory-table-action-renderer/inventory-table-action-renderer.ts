import { Component } from '@angular/core';
import { InventoryTableAction } from '@features/app-body/body-content/inventory/inventory-table-action';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableCellRenderer } from '@app/core/ui/table/interface/table-cell-renderer';
import { InventoryTableActionCallback } from '@features/app-body/body-content/inventory/inventory-table-action-callback';

@Component({
  selector: 'app-inventory-table-action-renderer',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './inventory-table-action-renderer.html',
  styleUrl: './inventory-table-action-renderer.css',
})
export class InventoryTableActionRendererComponent extends TableCellRenderer<
  Map<InventoryTableAction, InventoryTableActionCallback>
> {
  protected readonly InventoryTableAction = InventoryTableAction;

  public constructor() {
    super();
  }

  protected onActionButtonClick(action: InventoryTableAction): void {
    const map: Map<InventoryTableAction, InventoryTableActionCallback> = this.value();

    const callback: InventoryTableActionCallback | undefined = map.get(action);
    if (callback) {
      callback.execute();
    } else {
      console.warn(`No callback found for action ${action}`);
    }
  }
}
