import {
	ImageS3StorageKeyToUrlFormatterOptions
} from '@core/utils/s3-storage-key-formatter/image-s3-storage-key-to-url-formatter-options';
import { S3StorageKeyToUrlFormatter } from '@core/utils/s3-storage-key-formatter/s3-storage-key-to-url-formatter';

export abstract class ImageS3StorageKeyToUrlFormatter extends S3StorageKeyToUrlFormatter<ImageS3StorageKeyToUrlFormatterOptions> {
	protected constructor() {
		super();
	}
}
