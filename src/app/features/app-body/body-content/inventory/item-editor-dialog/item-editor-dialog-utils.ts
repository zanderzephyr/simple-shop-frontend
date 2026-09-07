import { KEY_SEPARATOR } from '@core/utils/localization-utils';
import { BODY_KEY } from '@features/app-body/app-body-utils';

const INVENTORY_KEY: string = BODY_KEY + KEY_SEPARATOR + 'inventory';

const DIALOG_KEY: string = INVENTORY_KEY + KEY_SEPARATOR + 'dialog';
const DIALOG_FIELD_KEY: string = DIALOG_KEY + KEY_SEPARATOR + 'field';
export const IMAGE_URL_KEY: string = DIALOG_FIELD_KEY + KEY_SEPARATOR + 'imageUrl';
export const IMAGE_URL_ERROR_KEY: string = DIALOG_FIELD_KEY + KEY_SEPARATOR + 'imageUrlError';
export const MEDIA_TYPE_KEY: string = DIALOG_FIELD_KEY + KEY_SEPARATOR + 'mediaType';
export const MEDIA_TYPE_ERROR_KEY: string = DIALOG_FIELD_KEY + KEY_SEPARATOR + 'mediaTypeError';
export const PRICE_KEY: string = DIALOG_FIELD_KEY + KEY_SEPARATOR + 'price';
export const PRICE_ERROR_KEY: string = DIALOG_FIELD_KEY + KEY_SEPARATOR + 'priceError';
export const STOCK_KEY: string = DIALOG_FIELD_KEY + KEY_SEPARATOR + 'stock';
export const STOCK_ERROR_KEY: string = DIALOG_FIELD_KEY + KEY_SEPARATOR + 'stockError';
export const TITLE_KEY: string = DIALOG_FIELD_KEY + KEY_SEPARATOR + 'title';
export const TITLE_ERROR_KEY: string = DIALOG_FIELD_KEY + KEY_SEPARATOR + 'titleError';
