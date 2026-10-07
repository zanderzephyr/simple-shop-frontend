import { IllegalArgumentError } from '@core/utils/common-errors';
import { isBlank } from '@core/utils/string-utils';

export interface S3StorageKeyToUrlFormatterOptionsParams {
	baseUrl: string;
	bucketName: string;
}

export function cloneParams(params: S3StorageKeyToUrlFormatterOptionsParams): S3StorageKeyToUrlFormatterOptionsParams {
	return Object.freeze({
		baseUrl: params.baseUrl,
		bucketName: params.bucketName
	});
}

function validateParams(params: S3StorageKeyToUrlFormatterOptionsParams): void {
	if (isBlank(params.baseUrl)) {
		throw new IllegalArgumentError(`Invalid base URL!`);
	}

	if (isBlank(params.bucketName)) {
		throw new IllegalArgumentError(`Invalid bucket name!`);
	}
}

export abstract class S3StorageKeyToUrlFormatterOptions {
	readonly #baseUrl: string;
	readonly #bucketName: string;

	protected constructor(params: S3StorageKeyToUrlFormatterOptionsParams) {
		const paramsCopy: S3StorageKeyToUrlFormatterOptionsParams = cloneParams(params);

		validateParams(paramsCopy);

		this.#baseUrl = paramsCopy.baseUrl;
		this.#bucketName = paramsCopy.bucketName;
	}

	public getBaseUrl(): string {
		return this.#baseUrl;
	}

	public getBucketName(): string {
		return this.#bucketName;
	}
}
