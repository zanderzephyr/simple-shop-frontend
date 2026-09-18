import { KEY_SEPARATOR } from '@core/utils/localization-utils';
import { FILTERS_KEY } from '@features/app-body/item-search/item-search-sidebar/sidebar-filters/sidebar-filters-utils';

const PRICE_FILTER_KEY: string = FILTERS_KEY + KEY_SEPARATOR + 'priceFilter';
export const TITLE_KEY: string = PRICE_FILTER_KEY + KEY_SEPARATOR + 'title';
export const MAX_VALUE_LABEL_KEY: string = PRICE_FILTER_KEY + KEY_SEPARATOR + 'maxValueLabel';
export const MIN_VALUE_LABEL_KEY: string = PRICE_FILTER_KEY + KEY_SEPARATOR + 'minValueLabel';
