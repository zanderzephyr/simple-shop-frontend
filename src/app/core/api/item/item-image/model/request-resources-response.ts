import {
	RequestResourcesResponseDto,
	zodRequestResourcesResponseDto
} from '@api/item/item-image/dto/request-resources-response-dto';
import { IllegalStateError } from '@core/utils/common-errors';
import { isBlank } from '@core/utils/string-utils';
import { ZodType } from 'zod';

const secretKey: symbol = Symbol('secretKey');

/*
 Not exported, just as an internal part of the contract.
 Nobody can call the constructor without this interface
 being exported.
 */
interface RequestResourcesResponseData {
	[secretKey]: true; // Marker to prevent external construction
	thumbnailImageStorageKey?: string;
	galleryImageStorageKeys?: readonly string[];
}

export class RequestResourcesResponse {
	readonly #thumbnailImageStorageKey?: string;
	readonly #galleryImageStorageKeys?: readonly string[];

	public constructor(requestResourcesResponseData: RequestResourcesResponseData) {
		this.#thumbnailImageStorageKey = requestResourcesResponseData.thumbnailImageStorageKey;
		this.#galleryImageStorageKeys = requestResourcesResponseData.galleryImageStorageKeys;

		Object.freeze(this);
	}

	public getThumbnailImageStorageKey(): string | undefined {
		return this.#thumbnailImageStorageKey;
	}

	public getGalleryImageStorageKeys(): readonly string[] | undefined {
		return Object.freeze(this.#galleryImageStorageKeys);
	}
}

export class RequestResourcesResponseBuilder {
	#thumbnailImageStorageKey?: string;
	#galleryImageStorageKeys?: readonly string[];

	public constructor() {
		// Nothing to do so far
	}

	public getThumbnailImageStorageKey(): string | undefined {
		return this.#thumbnailImageStorageKey;
	}

	public setThumbnailImageStorageKey(thumbnailImageStorageKey: string | undefined): this {
		this.#thumbnailImageStorageKey = thumbnailImageStorageKey;
		return this;
	}

	public getGalleryImageStorageKeys(): readonly string[] | undefined {
		return this.#galleryImageStorageKeys;
	}

	public setGalleryImageStorageKeys(galleryImageStorageKeys: readonly string[] | undefined): this {
		this.#galleryImageStorageKeys = galleryImageStorageKeys;
		return this;
	}

	#createRequestResourcesResponseData(): RequestResourcesResponseData {
		this.#validate();

		// Existence of fields relies on the validation above.
		return {
			[secretKey]: true,
			thumbnailImageStorageKey: this.#thumbnailImageStorageKey,
			galleryImageStorageKeys: this.#galleryImageStorageKeys
		};
	}

	#validate(): void {
		if (this.#thumbnailImageStorageKey !== undefined && isBlank(this.#thumbnailImageStorageKey)) {
			throw new IllegalStateError('Invalid thumbnail image storage key!');
		}

		if (this.#galleryImageStorageKeys !== undefined) {
			for (const galleryImageStorageKey of this.#galleryImageStorageKeys) {
				if (galleryImageStorageKey === undefined || isBlank(galleryImageStorageKey)) {
					throw new IllegalStateError('Invalid storage key!');
				}
			}
		}
	}

	public build(): RequestResourcesResponse {
		return new RequestResourcesResponse(this.#createRequestResourcesResponseData());
	}
}

export function zodRequestResourcesResponse(): ZodType<RequestResourcesResponse> {
	return zodRequestResourcesResponseDto().transform((dto: RequestResourcesResponseDto): RequestResourcesResponse => {
		return new RequestResourcesResponseBuilder()
			.setThumbnailImageStorageKey(dto.thumbnailImageStorageKey)
			.setGalleryImageStorageKeys(dto.galleryImageStorageKeys)
			.build();
	});
}
