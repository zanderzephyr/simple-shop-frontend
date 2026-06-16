export const FlexDirection: {
  readonly ROW: { readonly id: 'ROW'; css: 'row' };
  readonly COLUMN: { readonly id: 'COLUMN'; css: 'column' };
} = {
  ROW: { id: 'ROW', css: 'row' },
  COLUMN: { id: 'COLUMN', css: 'column' },
} as const;
type ValueOf<T> = T[keyof T];
export type FlexDirection = ValueOf<typeof FlexDirection>;
