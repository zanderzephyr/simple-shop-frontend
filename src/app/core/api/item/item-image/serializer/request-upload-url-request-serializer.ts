import { RequestUploadUrlRequestDto } from '@api/item/item-image/dto/request-upload-url-request-dto';
import { RequestUploadUrlRequest } from '@api/item/item-image/model/request-upload-url-request';
import { UnsupportedOperationError } from '@core/utils/common-errors';

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
