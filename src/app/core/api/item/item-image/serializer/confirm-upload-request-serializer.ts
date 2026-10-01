import { ConfirmUploadRequestDto } from '@api/item/item-image/dto/confirm-upload-request-dto';
import { ConfirmUploadRequest } from '@api/item/item-image/model/confirm-upload-request';
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
