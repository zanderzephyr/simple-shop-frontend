import {
	S3StorageKeyToUrlFormatterOptions
} from '@core/utils/s3-storage-key-formatter/s3-storage-key-to-url-formatter-options';

export interface S3StorageKeyToUrlFormatter<OPTIONS extends S3StorageKeyToUrlFormatterOptions> {
	readonly interfaceTag: 's3StorageKeyToUrlFormatter';

	format(storageKey: string, formatterOptions: OPTIONS): string;
}
