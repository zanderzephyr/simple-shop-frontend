import { z, ZodType } from 'zod';

export interface RequestResourceResponseDto {
	thumbnailImageStorageKey?: string;
	galleryImageStorageKeys?: string[];
}

export function zodRequestResourceResponseDto(): ZodType<RequestResourceResponseDto> {
	return z.object({
		thumbnailImageStorageKey: z.string().optional(),
		galleryImageStorageKeys: z.array(z.string()).optional()
	});
}
