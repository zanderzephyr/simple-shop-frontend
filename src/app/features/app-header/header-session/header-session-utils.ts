import { FEATURE_KEY, KEY_SEPARATOR } from '@core/utils/localization-utils';

const APP_HEADER_KEY: string = FEATURE_KEY + KEY_SEPARATOR + 'header';
const SESSION_COMPONENT_KEY: string = APP_HEADER_KEY + KEY_SEPARATOR + 'session';
const SESSION_MENU_KEY: string = SESSION_COMPONENT_KEY + KEY_SEPARATOR + 'menu';

export const BOOK_KEEPING_KEY: string = SESSION_MENU_KEY + KEY_SEPARATOR + 'bookKeeping';
export const GLOBAL_TRANSACTIONS_KEY: string =
  SESSION_MENU_KEY + KEY_SEPARATOR + 'globalTransactions';
export const INVENTORY_KEY: string = SESSION_MENU_KEY + KEY_SEPARATOR + 'inventory';
export const LOGIN_KEY: string = SESSION_MENU_KEY + KEY_SEPARATOR + 'login';
export const LOGOUT_KEY: string = SESSION_MENU_KEY + KEY_SEPARATOR + 'logout';
export const MANAGEMENT_KEY: string = SESSION_MENU_KEY + KEY_SEPARATOR + 'management';
export const PROFILE_KEY: string = SESSION_MENU_KEY + KEY_SEPARATOR + 'profile';
export const SESSION_KEY: string = SESSION_MENU_KEY + KEY_SEPARATOR + 'session';
export const TRANSACTIONS_KEY: string = SESSION_MENU_KEY + KEY_SEPARATOR + 'transactions';
export const USER_MANAGEMENT_KEY: string = SESSION_MENU_KEY + KEY_SEPARATOR + 'userManagement';
