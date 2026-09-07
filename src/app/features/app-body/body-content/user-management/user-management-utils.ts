import { KEY_SEPARATOR } from '@core/utils/localization-utils';
import { BODY_KEY } from '@features/app-body/app-body-utils';

const USER_MANAGEMENT_KEY: string = BODY_KEY + KEY_SEPARATOR + 'userManagement';
export const REFRESH_KEY: string = USER_MANAGEMENT_KEY + KEY_SEPARATOR + 'refresh';
export const CREATE_USER_KEY: string = USER_MANAGEMENT_KEY + KEY_SEPARATOR + 'createUser';

const DIALOG_KEY: string = USER_MANAGEMENT_KEY + KEY_SEPARATOR + 'dialog';
export const CREATE_USER_TITLE_KEY: string = DIALOG_KEY + KEY_SEPARATOR + 'titleCreate';
export const MODIFY_USER_TITLE_KEY: string = DIALOG_KEY + KEY_SEPARATOR + 'titleModify';

const TABLE_KEY: string = USER_MANAGEMENT_KEY + KEY_SEPARATOR + 'table';
const TABLE_HEADER_KEY: string = TABLE_KEY + KEY_SEPARATOR + 'header';
const TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_KEY + KEY_SEPARATOR + 'title';
export const ACTIONS_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'actions';
export const FIRST_NAME_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'firstName';
export const LAST_NAME_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'lastName';
export const USERNAME_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'username';
export const USER_TYPE_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'userType';
