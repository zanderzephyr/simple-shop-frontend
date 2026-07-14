import { Component } from '@angular/core';
import { InventoryTableAction } from '@features/app-body/body-content/inventory/inventory-table-action';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Consumer } from '@core/utils/functional-interfaces';
import { TableCellRendererComponent } from '@ui/table/interface/table-cell-renderer';
import { TableCellContext } from '@ui/table/interface/table-cell-context';

@Component({
  selector: 'app-inventory-table-action-renderer',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './inventory-table-action-renderer.html',
  styleUrl: './inventory-table-action-renderer.css',
})
export class InventoryTableActionRendererComponent extends TableCellRendererComponent<
  Map<InventoryTableAction, Consumer<TableCellContext>>
> {
  protected readonly InventoryTableAction = InventoryTableAction;

  public constructor() {
    super();
  }

  protected onActionButtonClick(action: InventoryTableAction): void {
    const map: Map<InventoryTableAction, Consumer<TableCellContext>> = this.value();

    const callback: Consumer<TableCellContext> | undefined = map.get(action);
    if (callback) {
      callback(this.context());
    } else {
      console.warn(`No callback found for action ${action}`);
    }
  }
}
