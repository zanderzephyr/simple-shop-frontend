import { ENUM_KEY, KEY_SEPARATOR } from '@core/utils/localization-utils';
import { BODY_KEY } from '@features/app-body/app-body-utils';

export const INVENTORY_KEY: string = BODY_KEY + KEY_SEPARATOR + 'inventory';
export const REFRESH_KEY: string = INVENTORY_KEY + KEY_SEPARATOR + 'refresh';
export const CREATE_ITEM_KEY: string = INVENTORY_KEY + KEY_SEPARATOR + 'createItem';

const EDIT_ITEM_DIALOG_KEY: string = INVENTORY_KEY + KEY_SEPARATOR + 'editItemDialog';
export const CREATE_ITEM_TITLE_KEY: string = EDIT_ITEM_DIALOG_KEY + KEY_SEPARATOR + 'titleCreate';
export const MODIFY_ITEM_TITLE_KEY: string = EDIT_ITEM_DIALOG_KEY + KEY_SEPARATOR + 'titleModify';

export const IMAGE_MANAGEMENT_DIALOG_KEY: string = INVENTORY_KEY + KEY_SEPARATOR + 'imageManagementDialog';
export const IMAGE_MANAGEMENT_DIALOG_TITLE_KEY: string = IMAGE_MANAGEMENT_DIALOG_KEY + KEY_SEPARATOR + 'title';

const TABLE_KEY: string = INVENTORY_KEY + KEY_SEPARATOR + 'table';
const TABLE_HEADER_KEY: string = TABLE_KEY + KEY_SEPARATOR + 'header';
const TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_KEY + KEY_SEPARATOR + 'title';
export const ACTIONS_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'actions';
export const MEDIA_TYPE_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'mediaType';
export const PRICE_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'price';
export const STOCK_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'stock';
export const TITLE_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'title';

export const MEDIA_TYPE_ENUM_KEY: string = ENUM_KEY + KEY_SEPARATOR + 'mediaType' + KEY_SEPARATOR;
