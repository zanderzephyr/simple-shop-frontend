export const Theme: {
  readonly DARK: { readonly id: 'DARK' };
  readonly LIGHT: { readonly id: 'LIGHT' };
} = {
  DARK: { id: 'DARK' },
  LIGHT: { id: 'LIGHT' },
} as const;
type ValueOf<T> = T[keyof T];
export type Theme = ValueOf<typeof Theme>;
