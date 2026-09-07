import { KEY_SEPARATOR } from '@core/utils/localization-utils';
import { BODY_KEY } from '@features/app-body/app-body-utils';

const LOGIN_KEY: string = BODY_KEY + KEY_SEPARATOR + 'login';
export const DISCARD_FIELD_KEY: string = LOGIN_KEY + KEY_SEPARATOR + 'discard';
export const LOGIN_FAILED_KEY: string = LOGIN_KEY + KEY_SEPARATOR + 'loginFailed';
export const LOGIN_FIELD_KEY: string = LOGIN_KEY + KEY_SEPARATOR + 'login';
export const PASSWORD_FIELD_KEY: string = LOGIN_KEY + KEY_SEPARATOR + 'password';
export const PASSWORD_FIELD_ERROR_KEY: string = LOGIN_KEY + KEY_SEPARATOR + 'passwordError';
export const USERNAME_FIELD_KEY: string = LOGIN_KEY + KEY_SEPARATOR + 'username';
export const USERNAME_FIELD_ERROR_KEY: string = LOGIN_KEY + KEY_SEPARATOR + 'usernameError';
