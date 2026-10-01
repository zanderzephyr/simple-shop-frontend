import {
	RequestUploadUrlResponseDto,
	zodRequestUploadUrlResponseDto
} from '@api/item/item-image/dto/request-upload-url-response-dto';
import { IllegalStateError } from '@core/utils/common-errors';
import { isBlank } from '@core/utils/string-utils';
import { ZodType } from 'zod';

const secretKey: symbol = Symbol('secretKey');

/*
 Not exported, just as an internal part of the contract.
 Nobody can call the constructor without this interface
 being exported.
 */
interface RequestUploadUrlResponseData {
	[secretKey]: true; // Marker to prevent external construction
	uploadUrl: string;
	storageKey: string;
}

export class RequestUploadUrlResponse {
	readonly #uploadUrl: string;
	readonly #storageKey: string;

	public constructor(requestUploadUrlResponseData: RequestUploadUrlResponseData) {
		this.#uploadUrl = requestUploadUrlResponseData.uploadUrl;
		this.#storageKey = requestUploadUrlResponseData.storageKey;

		Object.freeze(this);
	}

	public getUploadUrl(): string {
		return this.#uploadUrl;
	}

	public getStorageKey(): string {
		return this.#storageKey;
	}
}

export class RequestUploadUrlResponseBuilder {
	#uploadUrl?: string;
	#storageKey?: string;

	public constructor() {
		// Nothing to do so far
	}

	public getUploadUrl(): string | undefined {
		return this.#uploadUrl;
	}

	public setUploadUrl(uploadUrl: string | undefined): this {
		this.#uploadUrl = uploadUrl;
		return this;
	}

	public getStorageKey(): string | undefined {
		return this.#storageKey;
	}

	public setStorageKey(storageKey: string | undefined): this {
		this.#storageKey = storageKey;
		return this;
	}

	#createRequestUploadUrlResponseData(): RequestUploadUrlResponseData {
		this.#validate();

		// Existence of fields relies on the validation above.
		return {
			[secretKey]: true,
			uploadUrl: this.#uploadUrl!,
			storageKey: this.#storageKey!
		};
	}

	#validate(): void {
		if (this.#uploadUrl === undefined || isBlank(this.#uploadUrl)) {
			throw new IllegalStateError('Invalid upload url!');
		}

		if (this.#storageKey === undefined || isBlank(this.#storageKey)) {
			throw new IllegalStateError('Invalid storage key!');
		}
	}

	public build(): RequestUploadUrlResponse {
		return new RequestUploadUrlResponse(this.#createRequestUploadUrlResponseData());
	}
}

export function zodRequestUploadUrlResponse(): ZodType<RequestUploadUrlResponse> {
	return zodRequestUploadUrlResponseDto().transform((dto: RequestUploadUrlResponseDto): RequestUploadUrlResponse => {
		return new RequestUploadUrlResponseBuilder()
			.setUploadUrl(dto.uploadUrl)
			.setStorageKey(dto.storageKey)
			.build();
	});
}
