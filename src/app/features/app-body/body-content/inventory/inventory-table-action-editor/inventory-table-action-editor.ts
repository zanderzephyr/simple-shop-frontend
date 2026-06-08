import { Component } from '@angular/core';
import { InventoryTableAction } from '@features/app-body/body-content/inventory/inventory-table-action';
import { TableCellEditor } from '@core/ui/table/interface/table-cell-editor';

@Component({
  selector: 'app-inventory-table-action-editor',
  imports: [],
  templateUrl: './inventory-table-action-editor.html',
  styleUrl: './inventory-table-action-editor.css',
})
export class InventoryTableActionEditorComponent extends TableCellEditor<
  Map<InventoryTableAction, (columnViewIndex: number, rowViewIndex: number) => void>
> {
  public constructor() {
    super();
  }
}
