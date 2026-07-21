import { DateTimeFormatter } from '@js-joda/core';
import { z, ZodType } from 'zod';

export const dateTimeFormatter: DateTimeFormatter =
  DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss.SSS');

export interface ItemDto {
  /**
   * Can be missing to the backend, never from the backend.
   */
  id: string | undefined;
  title: string;
  mediaType: string;
  stock: number;
  price: number;
  imageUrl: string;
  /**
   * Can be missing to the backend, never from the backend.
   */
  lastChange: string | undefined;
  /**
   * Can be missing to the backend, never from the backend.
   */
  lastChangedBy: string | undefined;
  /**
   * Can be missing to the backend, never from the backend.
   */
  version: string | undefined;
}

export function zodItemDto(): ZodType<ItemDto> {
  return z.object({
    id: z.string(),
    title: z.string(),
    mediaType: z.string(),
    stock: z.number(),
    price: z.number(),
    imageUrl: z.string(),
    lastChange: z.string(),
    lastChangedBy: z.string(),
    version: z.string(),
  });
}
