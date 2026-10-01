import { DeleteResourceRequestDto } from '@api/item/item-image/dto/delete-resource-request-dto';
import { DeleteResourceRequest } from '@api/item/item-image/model/delete-resource-request';
import { UnsupportedOperationError } from '@core/utils/common-errors';

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
