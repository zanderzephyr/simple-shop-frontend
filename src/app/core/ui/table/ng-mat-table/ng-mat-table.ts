import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CommonTableComponent } from '../common-table-component';

@Component({
  selector: 'app-ng-mat-table',
  imports: [CommonModule, MatTableModule],
  templateUrl: './ng-mat-table.html',
  styleUrl: './ng-mat-table.css',
})
export class NgMatTableComponent extends CommonTableComponent {
  public constructor() {
    super();
  }
}
