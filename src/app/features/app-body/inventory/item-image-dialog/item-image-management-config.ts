import { inject } from '@angular/core';
import { ItemImageService } from '@api/item/item-image/item-image-service';
import { ConfirmUploadResponse } from '@api/item/item-image/model/confirm-upload-response';
import {
	DeleteResourceRequest,
	DeleteResourceRequestBuilder
} from '@api/item/item-image/model/delete-resource-request';
import { ImageType } from '@api/item/item-image/model/image-type';
import { Item } from '@api/item/model/item';
import {
	ImageS3StorageKeyToUrlFormatterOptions
} from '@core/utils/s3-storage-key-formatter/image-s3-storage-key-to-url-formatter-options';
import { ImageManagementConfig } from '@ui/image-management/image-management-config';

export class ItemImageManagementConfig extends ImageManagementConfig {
	readonly #itemImageService: ItemImageService = inject(ItemImageService);

	readonly #item: Item;
	readonly #imageType: ImageType;
	readonly #width: number | undefined;
	readonly #height: number | undefined;

	public constructor({ item, imageType, width, height }: {
		item: Item;
		imageType: ImageType;
		width: number | undefined;
		height: number | undefined;
	}) {
		super();

		this.#item = item;
		this.#imageType = imageType;
		this.#width = width;
		this.#height = height;
	}

	public override getAllowedFileTypes(): string[] {
		return ['jpeg', 'webp'];
	}

	public override async removeImage(storageKey: string): Promise<void> {
		const itemId: bigint | undefined = this.#getItemId();
		if (itemId !== undefined) {
			const deleteRequest: DeleteResourceRequest = new DeleteResourceRequestBuilder()
				.setStorageKey(storageKey)
				.build();
			await this.#itemImageService.deleteImage(itemId, deleteRequest);
		}
	}

	public override async uploadImage(file: File): Promise<string | undefined> {
		const itemId: bigint | undefined = this.#getItemId();
		if (itemId !== undefined) {
			const response: ConfirmUploadResponse = await this.#itemImageService.uploadImage(itemId, this.#imageType, file);
			return response.getStorageKey();
		}
		return undefined;
	}

	public override createDownloadUrl(storageKey: string): string {
		const options: ImageS3StorageKeyToUrlFormatterOptions = new ImageS3StorageKeyToUrlFormatterOptions({
			height: this.#height,
			width: this.#width,
			baseUrl: this.#itemImageService.getBaseUrl(),
			bucketName: this.#itemImageService.getBucketName(),
			fileType: 'webp'
		});
		return this.#itemImageService.createImageUrl(storageKey, options);
	}

	#getItemId(): bigint | undefined {
		const itemId: bigint | undefined = this.#item.getId();
		if (itemId === undefined) {
			console.warn('Item image dialog: Item has no ID!');
		}
		return itemId;
	}
}
