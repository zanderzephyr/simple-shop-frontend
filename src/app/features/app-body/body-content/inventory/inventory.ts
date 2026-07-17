import { inject, Component, WritableSignal, signal, effect } from '@angular/core';
import {
  inventoryColumnDescriptions,
  extractItemValue,
  ACTIONS,
  COVER,
} from './inventory-column-descriptions';
import { NgMatTableComponent } from '@ui/table/ng-mat-table/ng-mat-table';
import { DefaultTableModel } from '@ui/table/default/default-table-model';
import { DefaultTableColumnModel } from '@ui/table/default/default-table-column-model';
import { Table } from '@ui/table/interface/table';
import { TableCellContext } from '@ui/table/interface/table-cell-context';
import { DefaultTable } from '@ui/table/default/default-table';
import { ItemService } from '@api/item/item-service';
import { Item, ItemBuilder, MediaType } from '@api/item/model/item';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InventoryTableAction } from './inventory-table-action';
import { ImageRendererConfiguration } from '@ui/renderer/image-renderer/image-renderer-configuration';
import { Consumer } from '@core/utils/functional-interfaces';
import { Page } from '@app/core/utils/page/page';
import { PageConfig } from '@app/core/utils/page/page-config';

@Component({
  selector: 'app-inventory',
  imports: [NgMatTableComponent, MatButtonModule, MatIconModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class InventoryComponent {
  readonly #itemService: ItemService = inject(ItemService);

  protected readonly table: Table = new DefaultTable(
    /*
			TODO Maybe later, it's better to have a more specialized table model,
			that has a list of items instead of the default tabel model's data matrix.
		*/
    new DefaultTableModel(inventoryColumnDescriptions),
    new DefaultTableColumnModel(inventoryColumnDescriptions),
  );

  readonly #page: WritableSignal<Page<Item> | undefined> = signal(undefined);

  protected readonly currentPageIndex: WritableSignal<number> = signal(0);
  protected readonly pageSize: WritableSignal<number> = signal(20);

  public constructor() {
    // TODO Remove. Just for testing.
    this.#initItems();

    effect(() => {
      const page: Page<Item> | undefined = this.#page();
      this.table.getTableModel().removeAllRows();
      if (page !== undefined) {
        page.getContent().forEach((item: Item) => this.#addItem(item));
      }
    });

    this.refresh();
  }

  // TODO Remove. Just for testing.
  async #initItems(): Promise<void> {
    const items: Item[] = new ItemGenerator().createItems();
    for (const item of items) {
      await this.#itemService.createItem(item);
    }
  }

  #addItem(item: Item): void {
    const row: unknown[] = [];

    for (const columnDescription of inventoryColumnDescriptions) {
      if (columnDescription === ACTIONS) {
        row.push(this.#createActionCallbackMap(item));
      } else if (columnDescription === COVER) {
        row.push(new ImageRendererConfiguration(item.getImageUrl()));
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
      this.#modify(tableCellContext, item),
    );
    map.set(InventoryTableAction.DELETE, (tableCellContext) =>
      this.#delete(tableCellContext, item),
    );

    return map;
  }

  protected refresh(): void {
    const pageConfig: PageConfig = new PageConfig(this.currentPageIndex(), this.pageSize());
    this.#itemService.getItems(pageConfig).then((page: Page<Item>) => this.#page.set(page));
  }

  protected add(): void {
    // TODO Show dialog to create an item. Save item in backend and refresh the table.
    //this.#itemService.addItem(item).then((createdItem: Item) => this.refresh());
    console.log('Add action triggered');
  }

  #modify(tableCellContext: TableCellContext, item: Item): void {
    // TODO Show dialog to modify the item. Save item in backend and refresh the table.
    //this.#itemService.modifyItem(item).then((modifiedItem: Item) => this.refresh());
    console.log('Modify action triggered');
  }

  #delete(tableCellContext: TableCellContext, item: Item): void {
    // TODO Is it safe, to stay on the same page after deletion? What if the last item on the page is deleted?
    this.#itemService.deleteItem(item).then(() => this.refresh());
  }
}

// Just needed until we have a proper service
class ItemGenerator {
  constructor() {
    // Nothing so far
  }

  public createItems(): Item[] {
    const items: Item[] = [];

    items.push(...this.#createBooks());
    items.push(...this.#createMovies());
    items.push(...this.#createGames());

    return items;
  }

  #createBooks(): Item[] {
    const books: Item[] = [];

    const hp1: Item = new ItemBuilder()
      .setTitle("Harry Potter and the Sorcerer's Stone")
      .setMediaType(MediaType.BOOK)
      .setStock(5)
      .setPrice(9.99)
      .setImageUrl('https://hp1-link.com')
      .setId(-1n)
      .setVersion(-1n)
      .build();
    books.push(hp1);

    const lotr1: Item = new ItemBuilder()
      .setTitle('The Lord of the Rings: The Fellowship of the Ring')
      .setMediaType(MediaType.BOOK)
      .setStock(3)
      .setPrice(12.99)
      .setImageUrl('https://lotr1-link.com')
      .setId(-1n)
      .setVersion(-1n)
      .build();
    books.push(lotr1);

    return books;
  }

  #createMovies(): Item[] {
    const movies: Item[] = [];

    const hpMovie: Item = new ItemBuilder()
      .setTitle('Harry Potter and the Sorcerer’s Stone (Movie)')
      .setMediaType(MediaType.MOVIE)
      .setStock(2)
      .setPrice(19.99)
      .setImageUrl('https://hp1-movie-link.com')
      .setId(-1n)
      .setVersion(-1n)
      .build();
    movies.push(hpMovie);

    const lotrMovie: Item = new ItemBuilder()
      .setTitle('The Lord of the Rings: The Fellowship of the Ring (Movie)')
      .setMediaType(MediaType.MOVIE)
      .setStock(1)
      .setPrice(24.99)
      .setImageUrl('https://lotr-movie-link.com')
      .setId(-1n)
      .setVersion(-1n)
      .build();
    movies.push(lotrMovie);

    return movies;
  }

  #createGames(): Item[] {
    const games: Item[] = [];

    const stellaris: Item = new ItemBuilder()
      .setTitle('Stellaris')
      .setMediaType(MediaType.GAME)
      .setStock(1)
      .setPrice(29.99)
      .setImageUrl('https://stellaris-link.com')
      .setId(-1n)
      .setVersion(-1n)
      .build();
    games.push(stellaris);

    const skyrim: Item = new ItemBuilder()
      .setTitle('The Elder Scrolls V: Skyrim')
      .setMediaType(MediaType.GAME)
      .setStock(1)
      .setPrice(29.99)
      .setImageUrl('https://skyrim-link.com')
      .setId(-1n)
      .setVersion(-1n)
      .build();
    games.push(skyrim);

    return games;
  }
}
