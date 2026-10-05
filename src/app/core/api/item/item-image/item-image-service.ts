import { Injectable } from '@angular/core';
import { ConfirmUploadRequest } from '@api/item/item-image/model/confirm-upload-request';
import { DeleteResourceRequest } from '@api/item/item-image/model/delete-resource-request';
import { RequestResourcesResponse } from '@api/item/item-image/model/request-resources-response';
import { RequestUploadUrlRequest } from '@api/item/item-image/model/request-upload-url-request';
import { RequestUploadUrlResponse } from '@api/item/item-image/model/request-upload-url-response';

@Injectable()
export abstract class ItemImageService {
	protected constructor() {
		// Nothing to do so far
	}

	/**
	 * Requests an upload URL for an item image file.
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
}
