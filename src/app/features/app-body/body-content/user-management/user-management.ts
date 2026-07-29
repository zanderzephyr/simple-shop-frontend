import { effect, inject, Component, computed, signal, WritableSignal } from '@angular/core';
import { UserService } from '@api/user/user-service';
import { User } from '@api/user/model/user';
import { DefaultTableModel } from '@ui/table/default/default-table-model';
import { DefaultTableColumnModel } from '@ui/table/default/default-table-column-model';
import {
  userManagementColumnDescriptions,
  extractUserValue,
  ACTIONS,
} from './user-management-column-descriptions';
import { Table } from '@ui/table/interface/table';
import { TableCellContext } from '@ui/table/interface/table-cell-context';
import { Consumer } from '@core/utils/functional-interfaces';
import { DefaultTable } from '@ui/table/default/default-table';
import { Page } from '@core/utils/page/page';
import { PageConfig } from '@core/utils/page/page-config';
import { UserManagementTableAction } from './user-management-table-action';
import { GeneralDialogComponent } from '@ui/dialog/general-dialog/general-dialog';
import { DialogService, openWarningDialog } from '@ui/dialog/interface/dialog-service';
import { DialogReference } from '@ui/dialog/interface/dialog-reference';
import { DialogConfig } from '@ui/dialog/interface/dialog-config';
import { MessageDialogResult } from '@ui/dialog/message-dialog/message-dialog-result';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgMatTableComponent } from '@ui/table/ng-mat-table/ng-mat-table';
import { UserManagementEditorDialogData } from './user-editor-dialog/user-editor-dialog-data';

@Component({
  selector: 'app-user-management',
  imports: [NgMatTableComponent, MatButtonModule, MatIconModule, MatPaginatorModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagementComponent {
  readonly #userService: UserService = inject(UserService);
  readonly #dialogService: DialogService = inject(DialogService);

  protected readonly table: Table = new DefaultTable(
    /*
			TODO Maybe later, it's better to have a more specialized table model,
			that has a list of items instead of the default tabel model's data matrix.
		*/
    new DefaultTableModel(userManagementColumnDescriptions),
    new DefaultTableColumnModel(userManagementColumnDescriptions),
  );

  readonly #page: WritableSignal<Page<User> | undefined> = signal(undefined);

  protected readonly pageIndex: WritableSignal<number> = signal(0);
  protected readonly pageSize: WritableSignal<number> = signal(20);

  protected readonly totalItems = computed(
    () => this.#page()?.getPageMetaData().getTotalElements() ?? 0,
  );

  public constructor() {
    effect(() => {
      const page: Page<User> | undefined = this.#page();
      this.table.getTableModel().removeAllRows();
      if (page !== undefined) {
        page.getContent().forEach((user: User) => this.#addUser(user));
      }
    });

    effect(() => {
      this.refresh();
    });
  }

  #addUser(user: User): void {
    const row: unknown[] = [];

    for (const columnDescription of userManagementColumnDescriptions) {
      if (columnDescription === ACTIONS) {
        row.push(this.#createActionCallbackMap(user));
      } else {
        row.push(extractUserValue(user, columnDescription));
      }
    }

    this.table.getTableModel().addRow(row);
  }

  #createActionCallbackMap(user: User): Map<UserManagementTableAction, Consumer<TableCellContext>> {
    const map: Map<UserManagementTableAction, Consumer<TableCellContext>> = new Map<
      UserManagementTableAction,
      Consumer<TableCellContext>
    >();

    map.set(UserManagementTableAction.MODIFY, (tableCellContext) =>
      this.#modify(tableCellContext, user),
    );
    map.set(UserManagementTableAction.DELETE, (tableCellContext) =>
      this.#delete(tableCellContext, user),
    );

    return map;
  }

  protected refresh(): void {
    const pageConfig: PageConfig = new PageConfig(this.pageIndex(), this.pageSize());
    this.#userService.getUsers(pageConfig).then((page: Page<User>) => this.#page.set(page));
  }

  protected async add(): Promise<void> {
    const userToCreate: User | undefined = await this.#showDialog('Create User', undefined);
    if (userToCreate) {
      this.#userService.createUser(userToCreate).then((createdUser: User) => this.refresh());
    }
  }

  async #showDialog(title: string, user: User | undefined): Promise<User | undefined> {
    const dialogData: UserManagementEditorDialogData = new UserManagementEditorDialogData(
      user,
      title,
    );
    const dialogConfiguration: DialogConfig<UserManagementEditorDialogData, User> =
      new DialogConfig<UserManagementEditorDialogData, User>(dialogData, GeneralDialogComponent);
    const dialogReference: DialogReference<User> = this.#dialogService.open(dialogConfiguration);

    return await dialogReference.getResult();
  }

  async #modify(tableCellContext: TableCellContext, user: User): Promise<void> {
    const userToModify: User | undefined = await this.#showDialog('Modify User', user);
    if (userToModify) {
      // TODO Performance: Simply use the resulting item and update the table instead of reloading the whole page.
      this.#userService.modifyUser(userToModify).then((modifiedUser: User) => this.refresh());
    }
  }

  async #delete(tableCellContext: TableCellContext, user: User): Promise<void> {
    const dialogReference: DialogReference<MessageDialogResult> = openWarningDialog(
      this.#dialogService,
      'Really delete user?',
    );
    const result: MessageDialogResult | undefined = await dialogReference.getResult();
    if (result === MessageDialogResult.CONFIRM) {
      this.#userService.deleteUser(user).then(() => this.refresh());
    }
  }

  protected onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
