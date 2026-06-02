import { Component } from '@angular/core';
import { CommonTableCellComponent } from '@app/core/ui/table/common-table-cell-component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-inventory-table-action',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './inventory-table-action.html',
  styleUrl: './inventory-table-action.css',
})
export class InventoryTableActionComponent extends CommonTableCellComponent {
  public constructor() {
    super();
  }

  protected edit(): void {
    // TODO Implement edit functionality
    console.log('Edit action triggered');
  }

  protected delete(): void {
    // TODO Implement delete functionality
    console.log('Delete action triggered');
  }
}
