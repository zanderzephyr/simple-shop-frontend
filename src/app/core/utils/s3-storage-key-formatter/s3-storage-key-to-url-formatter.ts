import {
	S3StorageKeyToUrlFormatterOptions
} from '@core/utils/s3-storage-key-formatter/s3-storage-key-to-url-formatter-options';

export abstract class S3StorageKeyToUrlFormatter<OPTIONS extends S3StorageKeyToUrlFormatterOptions> {
	public abstract format(storageKey: string, formatterOptions: OPTIONS): string;
}
