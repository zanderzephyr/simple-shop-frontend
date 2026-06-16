import { Component, inject } from '@angular/core';
import { ItemService } from '@api/item/item-service';
import { ItemSearchResults } from '@core/item-search-results';
import { MatButtonModule } from '@angular/material/button';
import { Item } from '@api/item/model/item';
import { DialogService, openInfoDialog } from '@ui/dialog/interface/dialog-service';

@Component({
  selector: 'app-body-content',
  imports: [MatButtonModule],
  templateUrl: './body-content.html',
  styleUrl: './body-content.css',
})
export class BodyContentComponent {
  readonly #itemService: ItemService = inject(ItemService);

  readonly #itemSearchResults: ItemSearchResults = inject(ItemSearchResults);

  readonly #dialogService: DialogService = inject(DialogService);

  constructor() {
    // Nothing to do so far
  }

  protected async addSearchResults(): Promise<void> {
    const items: readonly Item[] = await this.#itemService.getItems();
    this.#itemSearchResults.addSearchResults(items);
  }

  protected removeSearchResults(): void {
    this.#itemSearchResults.clearSearchResults();
  }

  protected async showInfoDialog(): Promise<void> {
    const dialogReference = openInfoDialog(this.#dialogService, 'You are awesome!!', (config) =>
      config.setDisableClose(true),
    );
    const dialogResult = await dialogReference.getResult();
    console.log(`Dialog result: ${dialogResult?.id ?? 'undefined'}`);
  }
}
