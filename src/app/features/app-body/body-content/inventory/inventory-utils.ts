import { FEATURE_KEY, KEY_SEPARATOR } from '@core/utils/localization-utils';

const INVENTORY_KEY: string = FEATURE_KEY + KEY_SEPARATOR + 'inventory';
export const REFRESH_KEY: string = INVENTORY_KEY + KEY_SEPARATOR + 'refresh';
export const CREATE_ITEM_KEY: string = INVENTORY_KEY + KEY_SEPARATOR + 'createItem';

const DIALOG_KEY: string = INVENTORY_KEY + KEY_SEPARATOR + 'dialog';
export const CREATE_ITEM_TITLE_KEY: string = DIALOG_KEY + KEY_SEPARATOR + 'titleCreate';
export const MODIFY_ITEM_TITLE_KEY: string = DIALOG_KEY + KEY_SEPARATOR + 'titleModify';

const TABLE_KEY: string = INVENTORY_KEY + KEY_SEPARATOR + 'table';
const TABLE_HEADER_KEY: string = TABLE_KEY + KEY_SEPARATOR + 'header';
const TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_KEY + KEY_SEPARATOR + 'title';
export const ACTIONS_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'actions';
export const COVER_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'cover';
export const MEDIA_TYPE_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'mediaType';
export const PRICE_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'price';
export const STOCK_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'stock';
export const TITLE_TABLE_HEADER_TITLE_KEY: string = TABLE_HEADER_TITLE_KEY + KEY_SEPARATOR + 'title';
