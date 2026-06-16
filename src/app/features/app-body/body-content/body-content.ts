import { Component, inject } from '@angular/core';
import { ItemService } from '@api/item/item-service';
import { ItemSearchResults } from '@core/item-search-results';
import { MatButtonModule } from '@angular/material/button';
import { Item } from '@api/item/model/item';
import { DialogService } from '@ui/dialog/interface/dialog-service';
import { DialogReference } from '@ui/dialog/interface/dialog-reference';
import { DefaultDialogConfig } from '@ui/dialog/default/default-dialog-config';
import { SimpleDialogComponent } from '@app/simple-dialog/simple-dialog';
import { GeneralDialogContentComponent } from '@app/core/ui/dialog/general-dialog-content/general-dialog-content';
import { DialogConfig } from '@ui/dialog/interface/dialog-config';
import { InfoDialogComponent } from '@ui/dialog/message-dialog/info-dialog/info-dialog';
import { MessageDialogContentData } from '@ui/dialog/message-dialog/message-dialog-content-data';
import { MessageDialogResult } from '@ui/dialog/message-dialog/message-dialog-result';

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
    const dialogReference: DialogReference<string> = this.#dialogService.open(
      new DefaultDialogConfig('Some data', SimpleDialogComponent),
    );
    const dialogResult: string | undefined = await dialogReference.getResult();
    let message: string = 'Dialog result: ';
    if (dialogResult) {
      message += dialogResult;
    } else {
      message += 'undefined';
    }
    console.log(message);
  }

  protected async showInfoDialog(): Promise<void> {
    const dialogContentData = new MessageDialogContentData<InfoDialogComponent>(
      'You are awesome!!',
      'Info',
      InfoDialogComponent,
    );

    const dialogConfiguration = new DefaultDialogConfig<
      MessageDialogContentData<InfoDialogComponent>,
      MessageDialogResult,
      GeneralDialogContentComponent<
        MessageDialogContentData<InfoDialogComponent>,
        MessageDialogResult,
        InfoDialogComponent
      >
    >(dialogContentData, GeneralDialogContentComponent);

    const dialogReference = this.#dialogService.open<
      MessageDialogContentData<InfoDialogComponent>,
      MessageDialogResult,
      GeneralDialogContentComponent<
        MessageDialogContentData<InfoDialogComponent>,
        MessageDialogResult,
        InfoDialogComponent
      >,
      DialogConfig<
        MessageDialogContentData<InfoDialogComponent>,
        GeneralDialogContentComponent<
          MessageDialogContentData<InfoDialogComponent>,
          MessageDialogResult,
          InfoDialogComponent
        >
      >
    >(dialogConfiguration);

    const dialogResult = await dialogReference.getResult();
    let message: string = 'Dialog result: ';
    if (dialogResult) {
      message += dialogResult.id;
    } else {
      message += 'undefined';
    }
    console.log(message);
  }
}
