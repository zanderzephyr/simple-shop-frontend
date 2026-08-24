import { Component } from '@angular/core';
import { UserManagementTableAction } from '@features/app-body/body-content/user-management/user-management-table-action';
import { TableCellEditorComponent } from '@ui/table/interface/table-cell-editor';

@Component({
  selector: 'app-user-management-table-action-editor',
  imports: [],
  templateUrl: './user-management-table-action-editor.html',
  styleUrl: './user-management-table-action-editor.scss',
})
export class UserManagementTableActionEditorComponent extends TableCellEditorComponent<
  Map<UserManagementTableAction, (columnViewIndex: number, rowViewIndex: number) => void>
> {
  public constructor() {
    super();
  }
}
