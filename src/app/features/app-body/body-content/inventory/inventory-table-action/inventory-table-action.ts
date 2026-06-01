import { Component } from '@angular/core';
import { NgMatTableCellComponent } from '@app/core/ui/table/ng-mat-table/ng-mat-table-cell/ng-mat-table-cell';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-inventory-table-action',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './inventory-table-action.html',
  styleUrl: './inventory-table-action.css',
})
export class InventoryTableActionComponent extends NgMatTableCellComponent {
  public constructor() {
    super();
  }

  protected edit(): void {
    // TODO Implement edit functionality
    console.log('Edit action triggered');
    console.log(this.columnViewIndex());
    console.log(this.rowViewIndex());
  }

  protected delete(): void {
    // TODO Implement delete functionality
    console.log('Delete action triggered');
  }
}
