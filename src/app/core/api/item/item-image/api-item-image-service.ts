import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RequestResourcesResponseDto } from '@api/item/item-image/dto/request-resources-response-dto';
import { RequestUploadUrlResponseDto } from '@api/item/item-image/dto/request-upload-url-response-dto';
import { ItemImageService } from '@api/item/item-image/item-image-service';
import { ConfirmUploadRequest, ConfirmUploadRequestBuilder } from '@api/item/item-image/model/confirm-upload-request';
import { DeleteResourceRequest } from '@api/item/item-image/model/delete-resource-request';
import { ImageType } from '@api/item/item-image/model/image-type';
import {
	RequestResourcesResponse,
	zodRequestResourcesResponse
} from '@api/item/item-image/model/request-resources-response';
import {
	RequestUploadUrlRequest,
	RequestUploadUrlRequestBuilder
} from '@api/item/item-image/model/request-upload-url-request';
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
import { IllegalArgumentError } from '@core/utils/common-errors';
import { determineFileType } from '@core/utils/file-utils';
import { Observable } from 'rxjs';

// TODO Deal with errors when communicating with the backend.
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

	public override async uploadImageToUrl(uploadUrl: string, file: File): Promise<void> {
		const headers: HttpHeaders = new HttpHeaders().set('Content-Type', file.type);
		const options = { headers };

		const uploadStream$: Observable<unknown> = this.#httpClient.put(uploadUrl, file, options);
		await executeApiCall(uploadStream$);
	}

	public override async uploadImage(itemId: bigint, imageType: ImageType, file: File): Promise<void> {
		const requestUploadUrlResponse: RequestUploadUrlResponse = await this.#requestUploadUrl(itemId, imageType, file);

		await this.uploadImageToUrl(requestUploadUrlResponse.getUploadUrl(), file);

		await this.#confirmUpload(itemId, requestUploadUrlResponse.getStorageKey());
	}

	#requestUploadUrl(itemId: bigint, imageType: ImageType, file: File): Promise<RequestUploadUrlResponse> {
		const fileType: string | undefined = determineFileType(file.name);
		if (fileType === undefined) {
			throw new IllegalArgumentError('The file has no file type: ' + file.name);
		}

		const requestUploadUrlRequest: RequestUploadUrlRequest = new RequestUploadUrlRequestBuilder()//
			.setImageType(imageType)//
			.setFileType(fileType)//
			.setFileSizeInBytes(BigInt(file.size))//
			.build();// ;
		return this.requestImageUrl(itemId, requestUploadUrlRequest);
	}

	#confirmUpload(itemId: bigint, storageKey: string): Promise<void> {
		const confirmUploadRequest: ConfirmUploadRequest = new ConfirmUploadRequestBuilder()//
			.setStorageKey(storageKey)//
			.build();
		return this.confirmUpload(itemId, confirmUploadRequest);
	}
}
