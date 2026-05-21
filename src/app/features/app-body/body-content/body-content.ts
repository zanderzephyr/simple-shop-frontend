import { Component, inject } from '@angular/core';
import { ItemService } from '@app/core/api/item/item.service';
import { ItemSearchResults } from '@app/core/item-search-results';
import { MatButtonModule } from '@angular/material/button';
import { Item } from '@app/core/api/item/model/item';

@Component({
  selector: 'app-body-content',
  imports: [MatButtonModule],
  templateUrl: './body-content.html',
  styleUrl: './body-content.css',
})
export class BodyContentComponent {
  readonly #itemService: ItemService = inject(ItemService);

  readonly #itemSearchResults: ItemSearchResults = inject(ItemSearchResults);

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
}
