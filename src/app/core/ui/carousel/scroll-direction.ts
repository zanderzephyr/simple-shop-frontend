export const ScrollDirection = {
	BACKWARD: { id: 'BACKWARD' },
	FORWARD: { id: 'FORWARD' }
} as const;
type ValueOf<T> = T[keyof T];
export type ScrollDirection = ValueOf<typeof ScrollDirection>;
