import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ItemService } from '@api/item/item-service';
import { Item } from '@api/item/model/item';
import { LocalizationService } from '@core/localization/localization-service';
import { Consumer } from '@core/utils/functional-interfaces';
import { Page } from '@core/utils/page/page';
import { PageConfig } from '@core/utils/page/page-config';
import { ItemImageDialogData } from '@features/app-body/inventory/item-image-dialog/item-image-dialog-data';
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
import { ACTIONS, extractItemValue, inventoryColumnDescriptions } from './inventory-column-descriptions';
import { InventoryTableAction } from './inventory-table-action';
import * as Keys from './inventory-utils';
import { ItemEditorDialogData } from './item-editor-dialog/item-editor-dialog-data';

@Component({
	selector: 'app-inventory',
	imports: [NgMatTableComponent, MatButtonModule, MatIconModule, MatPaginatorModule],
	templateUrl: './inventory.html',
	styleUrl: './inventory.scss'
})
export class InventoryComponent {
	readonly #itemService: ItemService = inject(ItemService);
	readonly #dialogService: DialogService = inject(DialogService);

	readonly #localizationService: LocalizationService = inject(LocalizationService);
	protected readonly refreshText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.REFRESH_KEY));
	protected readonly createItemText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.CREATE_ITEM_KEY));

	protected readonly table: Table = new DefaultTable(
		/*
				TODO Maybe later, it's better to have a more specialized table model,
				that has a list of items instead of the default tabel model's data matrix.
			*/
		new DefaultTableModel(inventoryColumnDescriptions),
		new DefaultTableColumnModel(inventoryColumnDescriptions)
	);

	readonly #page: WritableSignal<Page<Item> | undefined> = signal(undefined);

	protected readonly pageIndex: WritableSignal<number> = signal(0);
	protected readonly pageSize: WritableSignal<number> = signal(20);

	protected readonly totalItems = computed(
		() => this.#page()?.getPageMetaData().getTotalElements() ?? 0
	);

	public constructor() {
		effect(() => {
			const page: Page<Item> | undefined = this.#page();
			this.table.getTableModel().removeAllRows();
			if (page !== undefined) {
				page.getContent().forEach((item: Item) => this.#addItem(item));
			}
		});

		effect(() => {
			this.refresh();
		});
	}

	#addItem(item: Item): void {
		const row: unknown[] = [];

		for (const columnDescription of inventoryColumnDescriptions) {
			if (columnDescription === ACTIONS) {
				row.push(this.#createActionCallbackMap(item));
			} else {
				row.push(extractItemValue(item, columnDescription));
			}
		}

		this.table.getTableModel().addRow(row);
	}

	#createActionCallbackMap(item: Item): Map<InventoryTableAction, Consumer<TableCellContext>> {
		const map: Map<InventoryTableAction, Consumer<TableCellContext>> = new Map<
			InventoryTableAction,
			Consumer<TableCellContext>
		>();

		map.set(InventoryTableAction.MODIFY, (tableCellContext) =>
			this.#modify(tableCellContext, item)
		);
		map.set(InventoryTableAction.DELETE, (tableCellContext) =>
			this.#delete(tableCellContext, item)
		);
		map.set(InventoryTableAction.MANAGE_IMAGES, (tableCellContext) =>
			this.#manageImages(tableCellContext, item)
		);

		return map;
	}

	protected refresh(): void {
		const pageConfig: PageConfig = new PageConfig(this.pageIndex(), this.pageSize());
		this.#itemService.getItems(pageConfig).then((page: Page<Item>) => this.#page.set(page));
	}

	protected async add(): Promise<void> {
		const itemToCreate: Item | undefined = await this.#showItemEditorDialog(Keys.CREATE_ITEM_TITLE_KEY, undefined);
		if (itemToCreate) {
			this.#itemService.createItem(itemToCreate).then((createdItem: Item) => this.refresh());
		}
	}

	async #showItemEditorDialog(title: string, item: Item | undefined): Promise<Item | undefined> {
		const dialogData: ItemEditorDialogData = new ItemEditorDialogData(item, title);
		const dialogConfiguration: DialogConfig<ItemEditorDialogData, Item> = new DialogConfig<
			ItemEditorDialogData,
			Item
		>(dialogData, GeneralDialogComponent);
		const dialogReference: DialogReference<Item> = this.#dialogService.open(dialogConfiguration);

		return await dialogReference.getResult();
	}

	async #modify(tableCellContext: TableCellContext, item: Item): Promise<void> {
		const itemToModify: Item | undefined = await this.#showItemEditorDialog(Keys.MODIFY_ITEM_TITLE_KEY, item);
		if (itemToModify) {
			// TODO Performance: Simply use the resulting item and update the table instead of reloading the whole page.
			this.#itemService.modifyItem(itemToModify).then((modifiedItem: Item) => this.refresh());
		}
	}

	async #delete(tableCellContext: TableCellContext, item: Item): Promise<void> {
		const dialogReference: DialogReference<MessageDialogResult> = openWarningDialog(
			this.#dialogService,
			'Really delete item?'
		);
		const result: MessageDialogResult | undefined = await dialogReference.getResult();
		if (result === MessageDialogResult.CONFIRM) {
			this.#itemService.deleteItem(item).then(() => this.refresh());
		}
	}

	async #manageImages(tableCellContext: TableCellContext, item: Item): Promise<void> {
		await this.#showItemImageDialog(Keys.IMAGE_MANAGEMENT_DIALOG_TITLE_KEY, item);
	}

	async #showItemImageDialog(title: string, item: Item): Promise<void> {
		const dialogData: ItemImageDialogData = new ItemImageDialogData(item, title);
		const dialogConfiguration: DialogConfig<ItemImageDialogData, void> = new DialogConfig<
			ItemImageDialogData,
			void
		>(dialogData, GeneralDialogComponent);
		const dialogReference: DialogReference<void> = this.#dialogService.open(dialogConfiguration);

		return await dialogReference.getResult();
	}

	protected onPageChange(event: PageEvent): void {
		this.pageIndex.set(event.pageIndex);
		this.pageSize.set(event.pageSize);
	}
}
