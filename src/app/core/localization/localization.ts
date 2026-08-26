export const Localization = {
  ENGLISH: { id: 'ENGLISH', localizationKey: 'english' },
  GERMAN: { id: 'GERMAN', localizationKey: 'german' },
} as const;
type ValueOf<T> = T[keyof T];
export type Localization = ValueOf<typeof Localization>;
