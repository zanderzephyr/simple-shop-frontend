import { Component } from '@angular/core';
import { Consumer } from '@core/utils/functional-interfaces';
import { TableCellRendererComponent } from '@ui/table/interface/table-cell-renderer';
import { TableCellContext } from '@ui/table/interface/table-cell-context';
import { UserManagementTableAction } from '@features/app-body/body-content/user-management/user-management-table-action';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-management-table-action-renderer',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './user-management-table-action-renderer.html',
  styleUrl: './user-management-table-action-renderer.css',
})
export class UserManagementTableActionRendererComponent extends TableCellRendererComponent<
  Map<UserManagementTableAction, Consumer<TableCellContext>>
> {
  protected readonly UserManagementTableAction = UserManagementTableAction;

  public constructor() {
    super();
  }

  protected onActionButtonClick(action: UserManagementTableAction): void {
    const map: Map<UserManagementTableAction, Consumer<TableCellContext>> = this.value();

    const callback: Consumer<TableCellContext> | undefined = map.get(action);
    if (callback) {
      callback(this.context());
    } else {
      console.warn(`No callback found for action ${action}`);
    }
  }
}
