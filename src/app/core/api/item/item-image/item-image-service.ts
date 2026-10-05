import { Injectable } from '@angular/core';
import { ConfirmUploadRequest } from '@api/item/item-image/model/confirm-upload-request';
import { DeleteResourceRequest } from '@api/item/item-image/model/delete-resource-request';
import { RequestResourcesResponse } from '@api/item/item-image/model/request-resources-response';
import { RequestUploadUrlRequest } from '@api/item/item-image/model/request-upload-url-request';
import { RequestUploadUrlResponse } from '@api/item/item-image/model/request-upload-url-response';

@Injectable()
export abstract class ItemImageService {
	protected constructor() {
	}

	// TODO Document
	public abstract requestImageUrl(itemId: bigint, requestModel: RequestUploadUrlRequest): Promise<RequestUploadUrlResponse>;

	// TODO Document
	public abstract confirmUpload(itemId: bigint, requestModel: ConfirmUploadRequest): Promise<void>;

	// TODO Document
	public abstract deleteImage(itemId: bigint, requestModel: DeleteResourceRequest): Promise<void>;

	// TODO Document
	public abstract getImages(itemId: bigint): Promise<RequestResourcesResponse>;
}
