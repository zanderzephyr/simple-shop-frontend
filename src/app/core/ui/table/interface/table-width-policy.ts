export const TableWidthPolicy: {
  readonly EQUAL_SHARES: { readonly id: 'EQUAL_SHARES' };
  readonly FIXED: { readonly id: 'FIXED' };
} = {
  EQUAL_SHARES: { id: 'EQUAL_SHARES' },
  FIXED: { id: 'FIXED' },
} as const;
type ValueOf<T> = T[keyof T];
export type TableWidthPolicy = ValueOf<typeof TableWidthPolicy>;
