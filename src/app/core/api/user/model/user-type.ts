export const UserType: {
  readonly ADMIN: { readonly id: 'ADMIN'; readonly name: 'Admin' };
  readonly CUSTOMER: { readonly id: 'CUSTOMER'; readonly name: 'Customer' };
} = {
  ADMIN: { id: 'ADMIN', name: 'Admin' },
  CUSTOMER: { id: 'CUSTOMER', name: 'Customer' },
} as const;
type ValueOf<T> = T[keyof T];
export type UserType = ValueOf<typeof UserType>;
