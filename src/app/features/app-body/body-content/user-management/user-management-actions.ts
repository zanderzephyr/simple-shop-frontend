export const ItemAction: {
  readonly MODIFY: { readonly id: 'MODIFY'; readonly name: 'Modify' };
  readonly DELETE: { readonly id: 'DELETE'; readonly name: 'Delete' };
} = {
  MODIFY: { id: 'MODIFY', name: 'Modify' },
  DELETE: { id: 'DELETE', name: 'Delete' },
} as const;
type ValueOf<T> = T[keyof T];
export type ItemAction = ValueOf<typeof ItemAction>;
