import { Component } from '@angular/core';
import { InventoryTableAction } from '../inventory-table-action';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableCellRenderer } from '@app/core/ui/table/table-cell-renderer';
import { BiConsumer } from '@utils/functional-interfaces';

@Component({
  selector: 'app-inventory-table-action-renderer',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './inventory-table-action-renderer.html',
  styleUrl: './inventory-table-action-renderer.css',
})
export class InventoryTableActionRendererComponent extends TableCellRenderer<
  Map<InventoryTableAction, BiConsumer<number, number>>
> {
  protected readonly InventoryTableAction = InventoryTableAction;

  public constructor() {
    super();
  }

  protected onActionButtonClick(action: InventoryTableAction): void {
    const map: Map<InventoryTableAction, BiConsumer<number, number>> = this.value();
    console.log(map);
    console.log(typeof map);

    const callback: BiConsumer<number, number> | undefined = map.get(action);
    if (callback) {
      callback(this.context().getColumnViewIndex(), this.context().getRowViewIndex());
    } else {
      console.warn(`No callback found for action ${action}`);
    }
  }
}
