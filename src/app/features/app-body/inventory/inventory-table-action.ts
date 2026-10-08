import { createEnumSchema } from '@core/utils/type-utils';
import { ZodType } from 'zod';

export const InventoryTableAction = {
	ADD: { id: 'ADD' },
	DELETE: { id: 'DELETE' },
	MODIFY: { id: 'MODIFY' },
	MANAGE_IMAGES: { id: 'MANAGE_IMAGES', name: 'MANAGE_IMAGES' }
} as const;
type ValueOf<T> = T[keyof T];
export type InventoryTableAction = ValueOf<typeof InventoryTableAction>;

export function zodInventoryTableAction(): ZodType<InventoryTableAction> {
	return createEnumSchema(InventoryTableAction);
}
