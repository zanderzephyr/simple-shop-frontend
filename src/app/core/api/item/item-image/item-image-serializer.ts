import { ConfirmUploadRequestDto } from '@api/item/item-image/dto/confirm-upload-request-dto';
import { DeleteResourceRequestDto } from '@api/item/item-image/dto/delete-resource-request-dto';
import { RequestUploadUrlRequestDto } from '@api/item/item-image/dto/request-upload-url-request-dto';
import { ConfirmUploadRequest } from '@api/item/item-image/model/confirm-upload-request';
import { DeleteResourceRequest } from '@api/item/item-image/model/delete-resource-request';
import { RequestUploadUrlRequest } from '@api/item/item-image/model/request-upload-url-request';
import { UnsupportedOperationError } from '@core/utils/common-errors';

export class ConfirmUploadRequestSerializer {
	constructor() {
		throw new UnsupportedOperationError();
	}

	public static serialize(confirmUploadRequest: ConfirmUploadRequest): string {
		const confirmUploadRequestDto: ConfirmUploadRequestDto = {
			storageKey: confirmUploadRequest.getStorageKey()
		};

		return JSON.stringify(confirmUploadRequestDto);
	}
}

export class DeleteResourceRequestSerializer {
	constructor() {
		throw new UnsupportedOperationError();
	}

	public static serialize(deleteResourceRequest: DeleteResourceRequest): string {
		const deleteResourceRequestDto: DeleteResourceRequestDto = {
			storageKey: deleteResourceRequest.getStorageKey()
		};

		return JSON.stringify(deleteResourceRequestDto);
	}
}

export class RequestUploadUrlRequestSerializer {
	constructor() {
		throw new UnsupportedOperationError();
	}

	public static serialize(requestUploadUrlRequest: RequestUploadUrlRequest): string {
		const requestUploadUrlRequestDto: RequestUploadUrlRequestDto = {
			fileType: requestUploadUrlRequest.getFileType(),
			imageType: requestUploadUrlRequest.getImageType().id,
			fileSizeInBytes: requestUploadUrlRequest.getFileSizeInBytes().toString()
		};

		return JSON.stringify(requestUploadUrlRequestDto);
	}
}
