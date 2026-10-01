import {
	RequestResourceResponseDto,
	zodRequestResourceResponseDto
} from '@api/item/item-image/dto/request-resource-response-dto';
import { IllegalStateError } from '@core/utils/common-errors';
import { isBlank } from '@core/utils/string-utils';
import { ZodType } from 'zod';

const secretKey: symbol = Symbol('secretKey');

/*
 Not exported, just as an internal part of the contract.
 Nobody can call the constructor without this interface
 being exported.
 */
interface RequestResourceResponseData {
	[secretKey]: true; // Marker to prevent external construction
	thumbnailImageStorageKey?: string;
	galleryImageStorageKeys?: readonly string[];
}

export class RequestResourceResponse {
	readonly #thumbnailImageStorageKey?: string;
	readonly #galleryImageStorageKeys?: readonly string[];

	public constructor(requestResourceResponseData: RequestResourceResponseData) {
		this.#thumbnailImageStorageKey = requestResourceResponseData.thumbnailImageStorageKey;
		this.#galleryImageStorageKeys = requestResourceResponseData.galleryImageStorageKeys;

		Object.freeze(this);
	}

	public getThumbnailImageStorageKey(): string | undefined {
		return this.#thumbnailImageStorageKey;
	}

	public getGalleryImageStorageKeys(): readonly string[] | undefined {
		return Object.freeze(this.#galleryImageStorageKeys);
	}
}

export class RequestResourceResponseBuilder {
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

	#createRequestResourceResponseData(): RequestResourceResponseData {
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

	public build(): RequestResourceResponse {
		return new RequestResourceResponse(this.#createRequestResourceResponseData());
	}
}

export function zodRequestResourceResponse(): ZodType<RequestResourceResponse> {
	return zodRequestResourceResponseDto().transform((dto: RequestResourceResponseDto): RequestResourceResponse => {
		return new RequestResourceResponseBuilder()
			.setThumbnailImageStorageKey(dto.thumbnailImageStorageKey)
			.setGalleryImageStorageKeys(dto.galleryImageStorageKeys)
			.build();
	});
}
