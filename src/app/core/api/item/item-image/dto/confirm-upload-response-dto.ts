import { z, ZodType } from 'zod';

export interface ConfirmUploadResponseDto {
	storageKey: string;
}

export function zodConfirmUploadResponseDto(): ZodType<ConfirmUploadResponseDto> {
	return z.object({
		storageKey: z.string()
	});
}
