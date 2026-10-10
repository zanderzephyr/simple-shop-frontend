import { Component, computed, inject, input, InputSignal, resource, ResourceRef, Signal } from '@angular/core';
import { ItemImageService } from '@api/item/item-image/item-image-service';
import { RequestResourcesResponse } from '@api/item/item-image/model/request-resources-response';
import {
	ImageS3StorageKeyToUrlFormatterOptions
} from '@core/utils/s3-storage-key-formatter/image-s3-storage-key-to-url-formatter-options';
import { ItemOverviewData } from '@ui/item-overview/item-overview-data';
import { ImageRendererComponent } from '@ui/renderer/image-renderer/image-renderer';
import { ImageRendererConfiguration } from '@ui/renderer/image-renderer/image-renderer-configuration';

// Uses strings for the prices, so that we always have exactly two digits after the decimal separator. Number type would
// reduce 5.00 to 5.
@Component({
	selector: 'app-item-overview',
	imports: [ImageRendererComponent],
	templateUrl: './item-overview.html',
	styleUrl: './item-overview.scss'
})
export class ItemOverviewComponent {
	private static readonly THUMBNAIL_HEIGHT_IN_PX: number = 200;
	private static readonly THUMBNAIL_WIDTH_IN_PX: number = 200;

	readonly #itemImageService: ItemImageService = inject(ItemImageService);

	public readonly data: InputSignal<ItemOverviewData> = input.required<ItemOverviewData>();

	readonly #thumbnailResource: ResourceRef<string | undefined> = resource({
		params: () => this.data().getItem().getId(),
		loader: async (config) => {
			const itemId: bigint | undefined = config.params;
			if (itemId === undefined) {
				console.error('Item without ID in item overview!');
				return undefined;
			}
			const response: RequestResourcesResponse = await this.#itemImageService.getImages(itemId);
			return response.getThumbnailImageStorageKey();
		}
	});

	protected readonly imageRendererConfig: Signal<ImageRendererConfiguration> = computed(() => {
		const itemThumbnailStorageKey: string | undefined = this.#thumbnailResource.value();
		let itemThumbnailUrl: string | undefined = undefined;
		if (itemThumbnailStorageKey !== undefined) {
			const options: ImageS3StorageKeyToUrlFormatterOptions = new ImageS3StorageKeyToUrlFormatterOptions({
				height: ItemOverviewComponent.THUMBNAIL_HEIGHT_IN_PX,
				width: ItemOverviewComponent.THUMBNAIL_WIDTH_IN_PX,
				baseUrl: this.#itemImageService.getBaseUrl(),
				bucketName: this.#itemImageService.getBucketName(),
				fileType: 'webp'
			});
			itemThumbnailUrl = this.#itemImageService.createImageUrl(itemThumbnailStorageKey, options);
		}

		return new ImageRendererConfiguration(itemThumbnailUrl);
	});

	protected readonly price: Signal<string> = computed(() => {
		const price: number = this.data().getItem().getPrice();
		return (price / 100).toFixed(2);
	});

	protected readonly discountedPrice: Signal<string | undefined> = computed(() => {
		const discount: number | undefined = this.data().getDiscount();
		if (discount !== undefined) {
			const price: number = this.data().getItem().getPrice();
			return (price * (1 - discount) / 100).toFixed(2);
		}
		return undefined;
	});

	protected readonly discountInPercent: Signal<number | undefined> = computed(() => {
		const discount: number | undefined = this.data().getDiscount();
		if (discount !== undefined) {
			return discount * 100;
		}
		return undefined;
	});

	public constructor() {
		// Nothing to do so far
	}
}
