import { DateTimeFormatter } from '@js-joda/core';
import { z, ZodType } from 'zod';

export const dateTimeFormatter: DateTimeFormatter =
  DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss.SSS');

// Using the "?" allows the property key to be missing. "undefined" would enforce it with an empty value.
export interface ItemDto {
  /**
   * Can be missing to the backend, never from the backend.
   */
  id?: string;
  title: string;
  mediaType: string;
  stock: number;
  price: number;
  imageUrl: string;
  /**
   * Can be missing to the backend, never from the backend.
   */
  lastChange?: string;
  /**
   * Can be missing to the backend, never from the backend.
   */
  lastChangedBy?: string;
  /**
   * Can be missing to the backend, never from the backend.
   */
  version?: string;
}

export function zodItemDto(): ZodType<ItemDto> {
  return z.object({
    id: z.string().optional(),
    title: z.string(),
    mediaType: z.string(),
    stock: z.number(),
    price: z.number(),
    imageUrl: z.string(),
    lastChange: z.string().optional(),
    lastChangedBy: z.string().optional(),
    version: z.string().optional(),
  });
}
