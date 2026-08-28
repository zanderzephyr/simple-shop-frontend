import { z, ZodType } from 'zod';

// Using the "?" allows the property key to be missing. "undefined" would enforce it with an empty value.
export interface LoginResponseDto {
	credentialsOk: boolean;
	userId?: string;
	errorMessage?: string;
}

export function zodLoginResponseDto(): ZodType<LoginResponseDto> {
	return z.object({
		credentialsOk: z.boolean(),
		userId: z.string().optional(),
		errorMessage: z.string().optional()
	});
}
