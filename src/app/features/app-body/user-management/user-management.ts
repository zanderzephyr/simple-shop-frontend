import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { User } from '@api/user/model/user';
import { UserService } from '@api/user/user-service';
import { LocalizationService } from '@core/localization/localization-service';
import { Consumer } from '@core/utils/functional-interfaces';
import { Page } from '@core/utils/page/page';
import { PageConfig } from '@core/utils/page/page-config';
import { GeneralDialogComponent } from '@ui/dialog/general-dialog/general-dialog';
import { DialogConfig } from '@ui/dialog/interface/dialog-config';
import { DialogReference } from '@ui/dialog/interface/dialog-reference';
import { DialogService, openWarningDialog } from '@ui/dialog/interface/dialog-service';
import { MessageDialogResult } from '@ui/dialog/message-dialog/message-dialog-result';
import { DefaultTable } from '@ui/table/default/default-table';
import { DefaultTableColumnModel } from '@ui/table/default/default-table-column-model';
import { DefaultTableModel } from '@ui/table/default/default-table-model';
import { Table } from '@ui/table/interface/table';
import { TableCellContext } from '@ui/table/interface/table-cell-context';
import { NgMatTableComponent } from '@ui/table/ng-mat-table/ng-mat-table';
import { UserManagementEditorDialogData } from './user-editor-dialog/user-editor-dialog-data';
import { ACTIONS, extractUserValue, userManagementColumnDescriptions } from './user-management-column-descriptions';
import { UserManagementTableAction } from './user-management-table-action';
import * as Keys from './user-management-utils';

@Component({
	selector: 'app-user-management',
	imports: [NgMatTableComponent, MatButtonModule, MatIconModule, MatPaginatorModule],
	templateUrl: './user-management.html',
	styleUrl: './user-management.scss'
})
export class UserManagementComponent {
	readonly #userService: UserService = inject(UserService);
	readonly #dialogService: DialogService = inject(DialogService);

	readonly #localizationService: LocalizationService = inject(LocalizationService);
	protected readonly createUserText: Signal<string> = computed(() =>
		this.#localizationService.getValue(Keys.CREATE_USER_KEY)
	);
	protected readonly refreshText: Signal<string> = computed(() =>
		this.#localizationService.getValue(Keys.REFRESH_KEY)
	);

	protected readonly table: Table = new DefaultTable(
		/*
				TODO Maybe later, it's better to have a more specialized table model,
				that has a list of user instead of the default tabel model's data matrix.
			*/
		new DefaultTableModel(userManagementColumnDescriptions),
		new DefaultTableColumnModel(userManagementColumnDescriptions)
	);

	readonly #page: WritableSignal<Page<User> | undefined> = signal(undefined);

	protected readonly pageIndex: WritableSignal<number> = signal(0);
	protected readonly pageSize: WritableSignal<number> = signal(20);

	protected readonly totalUsers = computed(
		() => this.#page()?.getPageMetaData().getTotalElements() ?? 0
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
			this.#modify(tableCellContext, user)
		);
		map.set(UserManagementTableAction.DELETE, (tableCellContext) =>
			this.#delete(tableCellContext, user)
		);

		return map;
	}

	protected refresh(): void {
		const pageConfig: PageConfig = new PageConfig(this.pageIndex(), this.pageSize());
		this.#userService.getUsers(pageConfig).then((page: Page<User>) => this.#page.set(page));
	}

	protected async add(): Promise<void> {
		const userToCreate: User | undefined = await this.#showDialog(Keys.CREATE_USER_TITLE_KEY, undefined);
		if (userToCreate) {
			this.#userService.createUser(userToCreate).then((createdUser: User) => this.refresh());
		}
	}

	async #showDialog(title: string, user: User | undefined): Promise<User | undefined> {
		const dialogData: UserManagementEditorDialogData = new UserManagementEditorDialogData(
			user,
			title
		);
		const dialogConfiguration: DialogConfig<UserManagementEditorDialogData, User> =
			new DialogConfig<UserManagementEditorDialogData, User>(dialogData, GeneralDialogComponent);
		const dialogReference: DialogReference<User> = this.#dialogService.open(dialogConfiguration);

		return await dialogReference.getResult();
	}

	async #modify(tableCellContext: TableCellContext, user: User): Promise<void> {
		const userToModify: User | undefined = await this.#showDialog(Keys.MODIFY_USER_TITLE_KEY, user);
		if (userToModify) {
			// TODO Performance: Simply use the resulting user and update the table instead of reloading the whole page.
			this.#userService.modifyUser(userToModify).then((modifiedUser: User) => this.refresh());
		}
	}

	async #delete(tableCellContext: TableCellContext, user: User): Promise<void> {
		const dialogReference: DialogReference<MessageDialogResult> = openWarningDialog(
			this.#dialogService,
			'Really delete user?'
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
