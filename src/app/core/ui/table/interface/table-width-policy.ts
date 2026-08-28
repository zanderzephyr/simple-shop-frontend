export const TableWidthPolicy = {
	EQUAL_SHARES: { id: 'EQUAL_SHARES' },
	FIXED: { id: 'FIXED' }
} as const;
type ValueOf<T> = T[keyof T];
export type TableWidthPolicy = ValueOf<typeof TableWidthPolicy>;
