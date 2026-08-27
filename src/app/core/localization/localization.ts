export const Localization = {
  ENGLISH: { id: 'ENGLISH' },
  GERMAN: { id: 'GERMAN' },
} as const;
type ValueOf<T> = T[keyof T];
export type Localization = ValueOf<typeof Localization>;
