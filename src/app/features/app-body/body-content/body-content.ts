import { Component, inject } from '@angular/core';
import { ItemService } from '@api/item/item-service';
import { ItemSearchResults } from '@core/item-search-results';
import { MatButtonModule } from '@angular/material/button';
import { Item } from '@api/item/model/item';
import {
  DialogService,
  openInfoDialog,
  openWarningDialog,
  openErrorDialog,
} from '@ui/dialog/interface/dialog-service';
import { DialogReference } from '@ui/dialog/interface/dialog-reference';
import { PageConfig } from '@app/core/utils/page/page-config';
import { MessageDialogResult } from '@app/core/ui/dialog/message-dialog/message-dialog-result';

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
    const pageConfig: PageConfig = new PageConfig(0, 20);
    const items: readonly Item[] = await this.#itemService
      .getItems(pageConfig)
      .then((page) => page.getContent());
    this.#itemSearchResults.addSearchResults(items);
  }

  protected removeSearchResults(): void {
    this.#itemSearchResults.clearSearchResults();
  }

  protected async showInfoDialog(): Promise<void> {
    const dialogReference: DialogReference<MessageDialogResult> = openInfoDialog(
      this.#dialogService,
      'You are awesome!!',
      (config) => config.setDisableClose(true),
    );
    const dialogResult = await dialogReference.getResult();
    console.log(`Dialog result: ${dialogResult?.id ?? 'undefined'}`);
  }

  protected async showWarningDialog(): Promise<void> {
    const dialogReference: DialogReference<MessageDialogResult> = openWarningDialog(
      this.#dialogService,
      'Are you sure?!',
      (config) => config.setDisableClose(true),
    );
    const dialogResult = await dialogReference.getResult();
    console.log(`Dialog result: ${dialogResult?.id ?? 'undefined'}`);
  }

  protected async showErrorDialog(): Promise<void> {
    const dialogReference: DialogReference<MessageDialogResult> = openErrorDialog(
      this.#dialogService,
      'Nooo, sir!!',
      (config) => config.setDisableClose(true),
    );
    const dialogResult = await dialogReference.getResult();
    console.log(`Dialog result: ${dialogResult?.id ?? 'undefined'}`);
  }
}
