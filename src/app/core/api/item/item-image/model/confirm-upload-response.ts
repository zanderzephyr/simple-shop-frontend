import {
	ConfirmUploadResponseDto,
	zodConfirmUploadResponseDto
} from '@api/item/item-image/dto/confirm-upload-response-dto';
import { IllegalStateError } from '@core/utils/common-errors';
import { isBlank } from '@core/utils/string-utils';
import { ZodType } from 'zod';

const secretKey: symbol = Symbol('secretKey');

interface ConfirmUploadResponseData {
	[secretKey]: true; // Marker to prevent external construction
	storageKey: string;
}

export class ConfirmUploadResponse {
	readonly #storageKey: string;

	public constructor(confirmUploadResponseData: ConfirmUploadResponseData) {
		this.#storageKey = confirmUploadResponseData.storageKey;

		Object.freeze(this);
	}

	public getStorageKey(): string {
		return this.#storageKey;
	}
}

export class ConfirmUploadResponseBuilder {
	#storageKey?: string;

	public constructor() {
		// Nothing to do so far
	}

	public getStorageKey(): string | undefined {
		return this.#storageKey;
	}

	public setStorageKey(storageKey: string | undefined): this {
		this.#storageKey = storageKey;
		return this;
	}

	#createConfirmUploadResponseData(): ConfirmUploadResponseData {
		this.#validate();

		// Existence of fields relies on the validation above.
		return {
			[secretKey]: true,
			storageKey: this.#storageKey!
		};
	}

	#validate(): void {
		if (this.#storageKey === undefined || isBlank(this.#storageKey)) {
			throw new IllegalStateError('Invalid storage key!');
		}
	}

	public build(): ConfirmUploadResponse {
		return new ConfirmUploadResponse(this.#createConfirmUploadResponseData());
	}
}

export function zodConfirmUploadResponse(): ZodType<ConfirmUploadResponse> {
	return zodConfirmUploadResponseDto().transform((dto: ConfirmUploadResponseDto): ConfirmUploadResponse => {
		return new ConfirmUploadResponseBuilder()
			.setStorageKey(dto.storageKey)
			.build();
	});
}
