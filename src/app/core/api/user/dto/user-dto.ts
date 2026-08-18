import { DateTimeFormatter } from '@js-joda/core';
import { z, ZodType } from 'zod';

export const dateTimeFormatter: DateTimeFormatter =
  DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss.SSS');

// Using the "?" allows the property key to be missing. "undefined" would enforce it with an empty value.
export interface UserDto {
  /**
   * Can be missing to the backend, never from the backend.
   */
  id?: string;
  username: string;
  firstName: string;
  middleNames?: string[];
  lastName: string;
  email: string;
  userType: string;
  /**
   * Is always missing from the backend.
   * Can be missing to the backend in modification workflow, never missing for creation workflow.
   */
  passwordHash?: string;
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

export function zodUserDto(): ZodType<UserDto> {
  return z.object({
    id: z.string().optional(),
    username: z.string(),
    firstName: z.string(),
    middleNames: z.array(z.string()).optional(),
    lastName: z.string(),
    email: z.string(),
    userType: z.string(),
    passwordHash: z.string().optional(),
    lastChange: z.string().optional(),
    lastChangedBy: z.string().optional(),
    version: z.string().optional(),
  });
}
