import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ItemImageService } from '@api/item/item-image/item-image-service';
import { ImageType } from '@api/item/item-image/model/image-type';
import { ItemImageManagementConfig } from '@features/app-body/inventory/item-image-dialog/item-image-management-config';
import { ButtonConfiguration } from '@ui/button/button-configuration';
import { GeneralDialogContentComponent } from '@ui/dialog/general-dialog/general-dialog-content';
import { ImageManagementComponent } from '@ui/image-management/image-management';
import { ItemImageDialogData } from './item-image-dialog-data';

// TODO
// Dialog with possibility to manage item images.
// 1. Thumbnail: Possibility to choose *one* thumbnail image at the top. When the user chooses an image, it gets
// automatically uploaded and is displayed in the dialog. As long as there is no image, some kind of placeholder is
// shown.
// 2. Gallery images: Carousel with an add image component as the last element in the carousel for gallery
// images. On hovering over an element in the carousel, a delete button is displayed. As long as there are no gallery
// images, only the add button is shown.
@Component({
	selector: 'app-item-image-dialog',
	imports: [ImageManagementComponent],
	templateUrl: './item-image-dialog.html',
	styleUrl: './item-image-dialog.scss'
})
export class ItemImageDialogComponent extends GeneralDialogContentComponent<
	ItemImageDialogData,
	void
> {
	private static readonly THUMBNAIL_HEIGHT_IN_PX: number = 200;
	private static readonly THUMBNAIL_WIDTH_IN_PX: number = 200;

	readonly #itemImageService: ItemImageService = inject(ItemImageService);

	protected readonly initialThumbnailStorageKey: WritableSignal<string | undefined> = signal(undefined);

	protected readonly thumbnailImageManagementConfig: ItemImageManagementConfig = new ItemImageManagementConfig({
		item: this.getDialogData().getItem(),
		imageType: ImageType.THUMBNAIL,
		width: ItemImageDialogComponent.THUMBNAIL_WIDTH_IN_PX,
		height: ItemImageDialogComponent.THUMBNAIL_HEIGHT_IN_PX
	});

	public constructor() {
		super();

		this.#init();
	}

	#init(): void {
		const itemId: bigint | undefined = this.#getItemId();
		if (itemId !== undefined) {
			this.#itemImageService.getImages(itemId).then(response =>
				this.initialThumbnailStorageKey.set(response.getThumbnailImageStorageKey())
			);
		}
	}

	#getItemId(): bigint | undefined {
		const itemId: bigint | undefined = this.getDialogData().getItem().getId();
		if (itemId === undefined) {
			console.warn('Item image dialog: Item has no ID!');
		}
		return itemId;
	}

	protected override createButtonConfigurations(): ButtonConfiguration[] {
		return [this.getCloseButtonConfiguration()];
	}
}
