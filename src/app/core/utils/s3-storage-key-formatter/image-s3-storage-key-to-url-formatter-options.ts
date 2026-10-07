import { IllegalStateError } from '@core/utils/common-errors';
import {
	S3StorageKeyToUrlFormatterOptions,
	S3StorageKeyToUrlFormatterOptionsParams
} from '@core/utils/s3-storage-key-formatter/s3-storage-key-to-url-formatter-options';
import { isBlank } from '@core/utils/string-utils';
import { cloneParams as cloneParentParams } from './s3-storage-key-to-url-formatter-options';

interface ImageS3StorageKeyToUrlFormatterOptionsParams extends S3StorageKeyToUrlFormatterOptionsParams {
	width?: number;
	height?: number;
	fileType?: string;
}

function cloneParams(params: ImageS3StorageKeyToUrlFormatterOptionsParams): ImageS3StorageKeyToUrlFormatterOptionsParams {
	const parentCloneParams: S3StorageKeyToUrlFormatterOptionsParams = cloneParentParams(params);

	return Object.freeze({
		...parentCloneParams,
		width: params.width,
		height: params.height,
		fileType: params.fileType
	});
}

function validateParams(params: ImageS3StorageKeyToUrlFormatterOptionsParams): void {
	if (params.width !== undefined && params.width <= 0) {
		throw new IllegalStateError('Invalid width!');
	}

	if (params.height !== undefined && params.height <= 0) {
		throw new IllegalStateError('Invalid height!');
	}

	if (params.fileType !== undefined && isBlank(params.fileType)) {
		throw new IllegalStateError('Invalid file type!');
	}
}

export class ImageS3StorageKeyToUrlFormatterOptions extends S3StorageKeyToUrlFormatterOptions {
	readonly #width?: number;
	readonly #height?: number;
	readonly #fileType?: string;

	public constructor(params: ImageS3StorageKeyToUrlFormatterOptionsParams) {
		const paramsCopy: ImageS3StorageKeyToUrlFormatterOptionsParams = cloneParams(params);

		validateParams(paramsCopy);

		super(paramsCopy);

		this.#width = paramsCopy.width;
		this.#height = paramsCopy.height;
		this.#fileType = paramsCopy.fileType;

		Object.freeze(this);
	}

	public getWidth(): number | undefined {
		return this.#width;
	}

	public getHeight(): number | undefined {
		return this.#height;
	}

	public getFileType(): string | undefined {
		return this.#fileType;
	}
}
