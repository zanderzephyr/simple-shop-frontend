export const Theme = {
  DARK: { id: 'DARK', localizationKey: 'dark' },
  LIGHT: { id: 'LIGHT', localizationKey: 'light' },
} as const;
type ValueOf<T> = T[keyof T];
export type Theme = ValueOf<typeof Theme>;
