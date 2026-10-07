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

	/**
	 * https://docs.imgproxy.net/usage/processing
	 * Layout: {baseUrl}/unsafe/{resizing_type}/{width}/{height}/{extend}/{enlarge}/plain/s3://storageKey
	 *
	 * @param storageKey
	 * @param options
	 */
	public format(storageKey: string, options: ImageS3StorageKeyToUrlFormatterOptions): string {
		if (isBlank(storageKey)) {
			throw new IllegalArgumentError(`Storage key is empty!`);
		}

		// 0 tells imgproxy to calculate the missing dimension proportionally
		const width: number = options.getWidth() ?? 0;
		const height: number = options.getHeight() ?? 0;
		const fileType: string | undefined = options.getFileType()?.toLowerCase();

		const processingOptionsSegments: string[] = [];
		processingOptionsSegments.push('fit'); // keeps the image ratio intact and fits into the dimensions
		processingOptionsSegments.push(width.toString());
		processingOptionsSegments.push(height.toString());
		// do not add "padding" to the image / keep it as big as it is when a
		// dimensions doesn't fully fill.
		processingOptionsSegments.push('0');
		// do not stretch the image into bigger dimensions
		processingOptionsSegments.push('0');
		const processingOptions: string = processingOptionsSegments.join('/');

		const urlSegments: string[] = [];
		urlSegments.push(options.getBaseUrl());
		// We add "unsafe" as signature placeholder, as imgproxy is only meant for running in dev mode.
		urlSegments.push('unsafe');
		urlSegments.push(processingOptions);
		urlSegments.push('plain');
		urlSegments.push('s3:/');
		urlSegments.push(storageKey);
		if (fileType !== undefined) {
			urlSegments.push('@' + fileType);
		}

		return urlSegments.join('/');
	}
}
