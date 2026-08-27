export const Theme = {
  DARK: { id: 'DARK' },
  LIGHT: { id: 'LIGHT' },
} as const;
type ValueOf<T> = T[keyof T];
export type Theme = ValueOf<typeof Theme>;
