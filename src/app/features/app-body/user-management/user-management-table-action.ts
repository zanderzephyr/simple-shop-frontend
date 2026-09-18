import { createEnumSchema } from '@core/utils/type-utils';
import { ZodType } from 'zod';

export const UserManagementTableAction = {
	ADD: { id: 'ADD' },
	DELETE: { id: 'DELETE' },
	MODIFY: { id: 'MODIFY' }
} as const;
type ValueOf<T> = T[keyof T];
export type UserManagementTableAction = ValueOf<typeof UserManagementTableAction>;

export function zodUserManagementTableAction(): ZodType<UserManagementTableAction> {
	return createEnumSchema(UserManagementTableAction);
}
