import { z, ZodType } from 'zod';

export interface CurrentUserDto {
  userId: string;
}

export function zodCurrentUserDto(): ZodType<CurrentUserDto> {
  return z.object({
    userId: z.string(),
  });
}
