import { IllegalStateError } from '@core/utils/common-errors';
import { isBlank } from '@core/utils/string-utils';
import { ImageType } from './image-type';

const secretKey: symbol = Symbol('secretKey');

/*
 Not exported, just as an internal part of the contract.
 Nobody can call the constructor without this interface
 being exported.
 */
interface RequestUploadUrlRequestData {
	[secretKey]: true; // Marker to prevent external construction
	fileType: string;
	imageType: ImageType;
	fileSizeInBytes: bigint;
}

export class RequestUploadUrlRequest {
	readonly #fileType: string;
	readonly #imageType: ImageType;
	readonly #fileSizeInBytes: bigint;

	public constructor(requestUploadUrlRequestData: RequestUploadUrlRequestData) {
		this.#fileType = requestUploadUrlRequestData.fileType;
		this.#imageType = requestUploadUrlRequestData.imageType;
		this.#fileSizeInBytes = requestUploadUrlRequestData.fileSizeInBytes;

		Object.freeze(this);
	}

	public getFileType(): string {
		return this.#fileType;
	}

	public getImageType(): ImageType {
		return this.#imageType;
	}

	public getFileSizeInBytes(): bigint {
		return this.#fileSizeInBytes;
	}
}

// Defined here to prevent hoisting issues within the builder class. Sad JS problem, but effective solution.
function createAllowedFileTypes(): Set<string> {
	const allowedFileTypes: Set<string> = new Set();

	allowedFileTypes.add('jpeg');
	allowedFileTypes.add('jpg');
	allowedFileTypes.add('webp');

	return allowedFileTypes;
}

export class RequestUploadUrlRequestBuilder {
	static readonly #ALLOWED_FILE_TYPES: Set<string> = createAllowedFileTypes();
	static readonly #MIN_FILE_SIZE_IN_BYTES: bigint = 1n;
	static readonly #MAX_FILE_SIZE_IN_BYTES: bigint = 5000000n;

	#fileType?: string;
	#imageType?: ImageType;
	#fileSizeInBytes?: bigint;

	public constructor() {
		// Nothing to do so far
	}

	public getFileType(): string | undefined {
		return this.#fileType;
	}

	public setFileType(fileType: string | undefined): this {
		this.#fileType = fileType;
		return this;
	}

	public getImageType(): ImageType | undefined {
		return this.#imageType;
	}

	public setImageType(imageType: ImageType | undefined): this {
		this.#imageType = imageType;
		return this;
	}

	public getFileSizeInBytes(): bigint | undefined {
		return this.#fileSizeInBytes;
	}

	public setFileSizeInBytes(fileSizeInBytes: bigint | undefined): this {
		this.#fileSizeInBytes = fileSizeInBytes;
		return this;
	}

	#createRequestUploadUrlRequestData(): RequestUploadUrlRequestData {
		this.#validate();

		// Existence of fields relies on the validation above.
		return {
			[secretKey]: true,
			fileType: this.#fileType!,
			imageType: this.#imageType!,
			fileSizeInBytes: this.#fileSizeInBytes!
		};
	}

	#validate(): void {
		if (this.#fileType === undefined || isBlank(this.#fileType) ||
			!RequestUploadUrlRequestBuilder.#ALLOWED_FILE_TYPES.has(this.#fileType.toLowerCase())) {

			throw new IllegalStateError('Invalid file type!');
		}

		if (this.#imageType === undefined) {
			throw new IllegalStateError('No image type!');
		}

		if (this.#fileSizeInBytes === undefined ||
			this.#fileSizeInBytes < RequestUploadUrlRequestBuilder.#MIN_FILE_SIZE_IN_BYTES ||
			this.#fileSizeInBytes > RequestUploadUrlRequestBuilder.#MAX_FILE_SIZE_IN_BYTES) {

			throw new IllegalStateError('Invalid file size in bytes!');
		}
	}

	public build(): RequestUploadUrlRequest {
		return new RequestUploadUrlRequest(this.#createRequestUploadUrlRequestData());
	}
}
