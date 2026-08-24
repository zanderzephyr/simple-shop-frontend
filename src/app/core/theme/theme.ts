export const Theme: {
  readonly DARK: { readonly id: 'DARK'; readonly name: 'Dark' };
  readonly LIGHT: { readonly id: 'LIGHT'; readonly name: 'Light' };
} = {
  DARK: { id: 'DARK', name: 'Dark' },
  LIGHT: { id: 'LIGHT', name: 'Light' },
} as const;
type ValueOf<T> = T[keyof T];
export type Theme = ValueOf<typeof Theme>;
