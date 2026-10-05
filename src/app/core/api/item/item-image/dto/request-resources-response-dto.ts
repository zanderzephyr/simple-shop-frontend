import { z, ZodType } from 'zod';

export interface RequestResourcesResponseDto {
	thumbnailImageStorageKey?: string;
	galleryImageStorageKeys?: string[];
}

export function zodRequestResourcesResponseDto(): ZodType<RequestResourcesResponseDto> {
	return z.object({
		thumbnailImageStorageKey: z.string().optional(),
		galleryImageStorageKeys: z.array(z.string()).optional()
	});
}
