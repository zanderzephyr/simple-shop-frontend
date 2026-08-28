export const ItemAction = {
	MODIFY: { id: 'MODIFY', name: 'Modify' },
	DELETE: { id: 'DELETE', name: 'Delete' }
} as const;
type ValueOf<T> = T[keyof T];
export type ItemAction = ValueOf<typeof ItemAction>;
