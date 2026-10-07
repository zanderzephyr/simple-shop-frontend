import { IllegalArgumentError } from '@core/utils/common-errors';
import {
	ImageS3StorageKeyToUrlFormatter
} from '@core/utils/s3-storage-key-formatter/image-s3-storage-key-to-url-formatter';
import {
	ImageS3StorageKeyToUrlFormatterOptions
} from '@core/utils/s3-storage-key-formatter/image-s3-storage-key-to-url-formatter-options';
import { isBlank } from '@core/utils/string-utils';

/**
 * https://imgproxy.net/
 *
 * https://github.com/imgproxy/imgproxy/
 */
export class ImgproxyS3StorageKeyToUrlFormatter implements ImageS3StorageKeyToUrlFormatter {
	readonly interfaceTag: 's3StorageKeyToUrlFormatter' = 's3StorageKeyToUrlFormatter';

	public constructor() {
		// Nothing to do so far
	}

	public format(storageKey: string, options: ImageS3StorageKeyToUrlFormatterOptions): string {
		if (isBlank(storageKey)) {
			throw new IllegalArgumentError(`Storage key is empty!`);
		}

		// 0 tells imgproxy to calculate the missing dimension proportionally
		const width: number = options.getWidth() ?? 0;
		const height: number = options.getHeight() ?? 0;
		const fileType: string | undefined = options.getFileType()?.toLowerCase();

		// Swap out the file extension if a specific format (like 'webp') was requested
		let preprocessedStorageKey: string = storageKey;
		if (fileType !== undefined) {
			const lastDotIndex: number = preprocessedStorageKey.lastIndexOf('.');
			if (lastDotIndex >= 0) {
				preprocessedStorageKey = preprocessedStorageKey.substring(0, lastDotIndex) + '.' + fileType;
			} else {
				preprocessedStorageKey = preprocessedStorageKey + '.' + fileType;
			}
		}

		// Layout: /{resizing_type}/{width}/{height}/{extend}/{enlarge}/plain/s3://{bucket}/{key}
		const processingOptionsSegments: string[] = [];
		processingOptionsSegments.push('fit');
		processingOptionsSegments.push(width.toString());
		processingOptionsSegments.push(height.toString());
		processingOptionsSegments.push('0');
		processingOptionsSegments.push('0');
		const processingOptions: string = processingOptionsSegments.join('/');

		const urlSegments: string[] = [];
		urlSegments.push(options.getBaseUrl());
		urlSegments.push(processingOptions);
		urlSegments.push('plain');
		urlSegments.push('s3:/');
		urlSegments.push(preprocessedStorageKey);
		return urlSegments.join('/');
	}
}
