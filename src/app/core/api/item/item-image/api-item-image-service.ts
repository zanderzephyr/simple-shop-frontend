import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RequestResourcesResponseDto } from '@api/item/item-image/dto/request-resources-response-dto';
import { RequestUploadUrlResponseDto } from '@api/item/item-image/dto/request-upload-url-response-dto';
import { ItemImageService } from '@api/item/item-image/item-image-service';
import { ConfirmUploadRequest } from '@api/item/item-image/model/confirm-upload-request';
import { DeleteResourceRequest } from '@api/item/item-image/model/delete-resource-request';
import {
	RequestResourcesResponse,
	zodRequestResourcesResponse
} from '@api/item/item-image/model/request-resources-response';
import { RequestUploadUrlRequest } from '@api/item/item-image/model/request-upload-url-request';
import {
	RequestUploadUrlResponse,
	zodRequestUploadUrlResponse
} from '@api/item/item-image/model/request-upload-url-response';
import { ConfirmUploadRequestSerializer } from '@api/item/item-image/serializer/confirm-upload-request-serializer';
import { DeleteResourceRequestSerializer } from '@api/item/item-image/serializer/delete-resource-request-serializer';
import {
	RequestUploadUrlRequestSerializer
} from '@api/item/item-image/serializer/request-upload-url-request-serializer';
import { executeApiCall } from '@core/utils/api-errors';
import { Observable } from 'rxjs';

@Injectable() // Necessary for future dependency injection, even if this class is never directly injected.
export class ApiItemImageService extends ItemImageService {
	readonly #url = '/api/items/v1/images';

	readonly #httpClient = inject(HttpClient);

	constructor() {
		super();
	}

	public override async requestImageUrl(itemId: bigint, requestModel: RequestUploadUrlRequest): Promise<RequestUploadUrlResponse> {
		const url: string = this.#url + '/request-image-url/' + itemId.toString();
		const body: string = RequestUploadUrlRequestSerializer.serialize(requestModel);
		const headers: HttpHeaders = this.#createHeaders();
		const options = { headers };

		const dtoInStream$: Observable<RequestUploadUrlResponseDto> = this.#httpClient.post<RequestUploadUrlResponseDto>(url, body, options);
		const dtoIn: RequestUploadUrlResponseDto = await executeApiCall(dtoInStream$);
		return zodRequestUploadUrlResponse().parse(dtoIn);
	}

	public override async confirmUpload(itemId: bigint, requestModel: ConfirmUploadRequest): Promise<void> {
		const url: string = this.#url + '/confirm-upload/' + itemId.toString();
		const body: string = ConfirmUploadRequestSerializer.serialize(requestModel);
		const headers: HttpHeaders = this.#createHeaders();
		const options = { headers };

		const dtoInStream$: Observable<unknown> = this.#httpClient.post(url, body, options);
		await executeApiCall(dtoInStream$);
	}

	public override async deleteImage(itemId: bigint, requestModel: DeleteResourceRequest): Promise<void> {
		const url: string = this.#url + '/delete-image/' + itemId.toString();
		const body: string = DeleteResourceRequestSerializer.serialize(requestModel);
		const headers: HttpHeaders = this.#createHeaders();
		const options = { headers };

		const dtoInStream$: Observable<unknown> = this.#httpClient.post(url, body, options);
		await executeApiCall(dtoInStream$);
	}

	public override async getImages(itemId: bigint): Promise<RequestResourcesResponse> {
		const url: string = this.#url + '/get-images/' + itemId.toString();
		const headers: HttpHeaders = this.#createHeaders();
		const options = { headers };

		const dtoInStream$: Observable<RequestResourcesResponseDto> = this.#httpClient.get<RequestResourcesResponseDto>(url, options);
		const dtoIn: RequestResourcesResponseDto = await executeApiCall(dtoInStream$);
		return zodRequestResourcesResponse().parse(dtoIn);
	}

	#createHeaders(): HttpHeaders {
		return new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
	}
}
