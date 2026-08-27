import { ENUM_KEY, FEATURE_KEY, KEY_SEPARATOR } from '@core/utils/localization-utils';

export const LOCALIZATION_ENUM_KEY: string =
  ENUM_KEY + KEY_SEPARATOR + 'localization' + KEY_SEPARATOR;
export const THEME_ENUM_KEY: string = ENUM_KEY + KEY_SEPARATOR + 'theme' + KEY_SEPARATOR;

const SETTINGS_FEATURE_KEY: string = FEATURE_KEY + KEY_SEPARATOR + 'settings';
export const SETTINGS_HEADER_KEY: string = SETTINGS_FEATURE_KEY + KEY_SEPARATOR + 'header';

const UI_SETTINGS_KEY: string = SETTINGS_FEATURE_KEY + KEY_SEPARATOR + 'ui';

const LOCALIZATION_SETTINGS_KEY: string = UI_SETTINGS_KEY + KEY_SEPARATOR + 'localization';
export const CHOOSE_LOCALIZATION_LABEL_KEY: string =
  LOCALIZATION_SETTINGS_KEY + KEY_SEPARATOR + 'chooseLocalizationLabel';

const THEME_SETTINGS_KEY: string = UI_SETTINGS_KEY + KEY_SEPARATOR + 'theme';
export const CHOOSE_THEME_LABEL_KEY: string =
  THEME_SETTINGS_KEY + KEY_SEPARATOR + 'chooseThemeLabel';
