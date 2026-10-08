import { Injectable } from '@angular/core';
import { ConfirmUploadRequest } from '@api/item/item-image/model/confirm-upload-request';
import { DeleteResourceRequest } from '@api/item/item-image/model/delete-resource-request';
import { ImageType } from '@api/item/item-image/model/image-type';
import { RequestResourcesResponse } from '@api/item/item-image/model/request-resources-response';
import { RequestUploadUrlRequest } from '@api/item/item-image/model/request-upload-url-request';
import { RequestUploadUrlResponse } from '@api/item/item-image/model/request-upload-url-response';
import {
	ImageS3StorageKeyToUrlFormatterOptions
} from '@core/utils/s3-storage-key-formatter/image-s3-storage-key-to-url-formatter-options';

@Injectable()
export abstract class ItemImageService {
	protected constructor() {
		// Nothing to do so far
	}

	/**
	 * Requests an upload URL for an item image file.
	 *
	 * Take care:
	 * 1. The only supported image types are:
	 * - jpeg/jpg
	 * - webp
	 * 2. The size of the file to upload must be in [1, 5000000].
	 *
	 * @param itemId The ID of the item the image URL is requested for.
	 * @param requestModel The request.
	 */
	public abstract requestImageUrl(itemId: bigint, requestModel: RequestUploadUrlRequest): Promise<RequestUploadUrlResponse>;

	/**
	 * Confirms an item image file was uploaded.
	 *
	 * @param itemId The ID of the item for which the upload was performed.
	 * @param requestModel The request.
	 */
	public abstract confirmUpload(itemId: bigint, requestModel: ConfirmUploadRequest): Promise<void>;

	/**
	 * Deletes an item image file.
	 *
	 * @param itemId The ID of the item this image belongs to.
	 * @param requestModel The request.
	 */
	public abstract deleteImage(itemId: bigint, requestModel: DeleteResourceRequest): Promise<void>;

	/**
	 * Requests all item images for an item.
	 *
	 * @param itemId The ID of the item for which the images are to be requested.
	 */
	public abstract getImages(itemId: bigint): Promise<RequestResourcesResponse>;

	/**
	 * Uploads an image file directly to a pre-signed URL.
	 *
	 * Take care: The uploaded file properties have to match the properties that were previously used
	 * during the upload URL request. The backend will reject bad uploads.
	 *
	 * See {@link requestImageUrl} for what the further requirements for the arguments are.
	 *
	 * @param uploadUrl The pre-signed upload URL.
	 * @param file The image file to upload.
	 */
	public abstract uploadImageToUrl(uploadUrl: string, file: File): Promise<void>;

	/**
	 * Orchestrates the full image upload workflow:
	 * 1. Request an upload URL
	 * 2. Upload the image
	 * 3. Confirm the upload
	 *
	 * See {@link requestImageUrl} for what the requirements for the arguments are.
	 *
	 * @param itemId The ID of the item for which the image is to be uploaded.
	 * @param imageType The type of the image.
	 * @param file The image file to upload.
	 */
	public abstract uploadImage(itemId: bigint, imageType: ImageType, file: File): Promise<void>;

	/**
	 * Creates a URL to download an image stored with storageKey, using the given options.
	 *
	 * @param storageKey The storage key.
	 * @param options The image url formatting options.
	 */
	public abstract createImageUrl(storageKey: string, options: ImageS3StorageKeyToUrlFormatterOptions): string;
}
