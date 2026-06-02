export const InventoryTableAction: {
  readonly ADD: { readonly id: 'ADD' };
  readonly DELETE: { readonly id: 'DELETE' };
  readonly MODIFY: { readonly id: 'MODIFY' };
} = {
  ADD: { id: 'ADD' },
  DELETE: { id: 'DELETE' },
  MODIFY: { id: 'MODIFY' },
} as const;
type ValueOf<T> = T[keyof T];
export type InventoryTableAction = ValueOf<typeof InventoryTableAction>;
