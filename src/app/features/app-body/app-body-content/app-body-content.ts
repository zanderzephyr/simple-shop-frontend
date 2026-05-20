import { Component, inject } from '@angular/core';
import { ItemService } from '@app/core/api/item/item.service';
import { ItemSearchResults } from '@app/core/item-search-results';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-body-content',
  imports: [MatButtonModule],
  templateUrl: './app-body-content.html',
  styleUrl: './app-body-content.css',
})
export class AppBodyContentComponent {
  readonly #itemService: ItemService = inject(ItemService);

  readonly #itemSearchResults: ItemSearchResults = inject(ItemSearchResults);

  constructor() {
    // Nothing to do so far
  }

  protected addSearchResults(): void {
    this.#itemSearchResults.addSearchResults(this.#itemService.getItems()());
  }

  protected removeSearchResults(): void {
    this.#itemSearchResults.clearSearchResults();
  }
}
