import { z, ZodType } from 'zod';

export interface RequestUploadUrlResponseDto {
	uploadUrl: string;
	storageKey: string;
}

export function zodRequestUploadUrlResponseDto(): ZodType<RequestUploadUrlResponseDto> {
	return z.object({
		uploadUrl: z.string(),
		storageKey: z.string()
	});
}
