export const KEY_SEPARATOR: string = '.';
export const APP_KEY: string = 'app';
export const FEATURE_KEY: string = APP_KEY + KEY_SEPARATOR + 'feature';
export const GLOBAL_KEY: string = APP_KEY + KEY_SEPARATOR + 'global';
export const ENUM_KEY: string = GLOBAL_KEY + KEY_SEPARATOR + 'enum';

export interface LocalizedObject<T> {
	readonly object: T;
	readonly localizedLabel: string;
}
