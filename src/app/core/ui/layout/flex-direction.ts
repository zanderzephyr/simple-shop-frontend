export const FlexDirection = {
	ROW: { id: 'ROW', css: 'row' },
	COLUMN: { id: 'COLUMN', css: 'column' }
} as const;
type ValueOf<T> = T[keyof T];
export type FlexDirection = ValueOf<typeof FlexDirection>;
