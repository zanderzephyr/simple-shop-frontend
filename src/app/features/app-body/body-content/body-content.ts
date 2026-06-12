import { Component, inject } from '@angular/core';
import { ItemService } from '@api/item/item-service';
import { ItemSearchResults } from '@core/item-search-results';
import { MatButtonModule } from '@angular/material/button';
import { Item } from '@api/item/model/item';
import { DialogService } from '@ui/dialog/interface/dialog-service';
import { DialogReference } from '@ui/dialog/interface/dialog-reference';
import { DefaultDialogConfig } from '@ui/dialog/default/default-dialog-config';
import {
  SimpleDialogComponent,
  SimpleDialogComponentDialogData,
  SimpleDialogComponentDialogResult,
} from '@app/simple-dialog-component/simple-dialog-component';

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

  protected async showDialog(): Promise<void> {
    const dialogReference: DialogReference<SimpleDialogComponentDialogResult> =
      this.#dialogService.open(
        new DefaultDialogConfig(new SimpleDialogComponentDialogData(), SimpleDialogComponent),
      );
    const dialogResult: SimpleDialogComponentDialogResult | undefined =
      await dialogReference.getResult();
    let message: string = 'Dialog result: ';
    if (dialogResult) {
      message += dialogResult.getText();
    } else {
      message += 'undefined';
    }
    console.log(message);
  }
}
