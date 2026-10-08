import { Injectable } from '@angular/core';
import { IllegalArgumentError } from '@core/utils/common-errors';
import {
	ImageS3StorageKeyToUrlFormatter
} from '@core/utils/s3-storage-key-formatter/image-s3-storage-key-to-url-formatter';
import {
	ImageS3StorageKeyToUrlFormatterOptions
} from '@core/utils/s3-storage-key-formatter/image-s3-storage-key-to-url-formatter-options';
import { FormatterParameters } from '@core/utils/s3-storage-key-formatter/s3-storage-key-to-url-formatter';
import { isBlank } from '@core/utils/string-utils';

/**
 * https://imgproxy.net/
 *
 * https://github.com/imgproxy/imgproxy/
 */
@Injectable({
	providedIn: 'root'
})
export class ImgproxyS3StorageKeyToUrlFormatter extends ImageS3StorageKeyToUrlFormatter {
	public constructor() {
		super();
	}

	/**
	 * https://docs.imgproxy.net/usage/processing / https://docs.imgproxy.net/image_formats_support
	 */
	public format(params: FormatterParameters<ImageS3StorageKeyToUrlFormatterOptions>): string {
		if (isBlank(params.storageKey)) {
			throw new IllegalArgumentError(`Storage key is empty!`);
		}

		// defaults to resizing_type:fit, which keeps the image ratio intact and fits into the dimensions
		const processingOptionsSegments: string[] = [];
		// defaults to 0 in imgproxy
		const width: number | undefined = params.formatterOptions.getWidth();
		if (width !== undefined) {
			processingOptionsSegments.push('width:' + width.toString());
		}

		// defaults to 0 in imgproxy
		const height: number | undefined = params.formatterOptions.getHeight();
		if (height !== undefined) {
			processingOptionsSegments.push('height:' + height.toString());
		}
		const processingOptions: string = processingOptionsSegments.join('/');

		const urlSegments: string[] = [];
		urlSegments.push(params.formatterOptions.getBaseUrl());
		// We add "unsafe" as signature placeholder, as imgproxy is only meant for running in dev mode.
		urlSegments.push('unsafe');
		urlSegments.push(processingOptions);
		urlSegments.push('plain');
		urlSegments.push('s3:/');
		urlSegments.push(params.storageKey);
		const fileType: string | undefined = params.formatterOptions.getFileType();
		if (fileType !== undefined) {
			urlSegments.push('@' + fileType.toLowerCase());
		}

		return urlSegments.join('/');
	}
}
