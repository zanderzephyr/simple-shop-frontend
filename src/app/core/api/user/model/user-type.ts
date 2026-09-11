export const UserType = {
	ADMIN: { id: 'ADMIN' },
	CUSTOMER: { id: 'CUSTOMER' }
} as const;
type ValueOf<T> = T[keyof T];
export type UserType = ValueOf<typeof UserType>;

export function compareUserTypes(o1: UserType | null, o2: UserType | null): boolean {
	return o1?.id === o2?.id;
}
