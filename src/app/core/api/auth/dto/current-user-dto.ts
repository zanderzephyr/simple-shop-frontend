import { z, ZodType } from 'zod';

// Using the "?" allows the property key to be missing. "undefined" would enforce it with an empty value.
export interface CurrentUserDto {
  userId?: string;
}

export function zodCurrentUserDto(): ZodType<CurrentUserDto> {
  return z.object({
    userId: z.string().optional(),
  });
}
