import { ENUM_KEY, KEY_SEPARATOR } from '@core/utils/localization-utils';
import { FILTERS_KEY } from '@features/app-body/item-search/item-search-sidebar/sidebar-filters/sidebar-filters-utils';

const MEDIA_TYPE_FILTER_KEY: string = FILTERS_KEY + KEY_SEPARATOR + 'mediaTypeFilter';
export const TITLE_KEY: string = MEDIA_TYPE_FILTER_KEY + KEY_SEPARATOR + 'title';
export const ALL_TYPES_LABEL_KEY: string = MEDIA_TYPE_FILTER_KEY + KEY_SEPARATOR + 'allTypesLabel';
export const CHOOSE_MEDIA_TYPE_LABEL_KEY: string = MEDIA_TYPE_FILTER_KEY + KEY_SEPARATOR + 'chooseMediaTypeLabel';

export const MEDIA_TYPE_ENUM_KEY: string = ENUM_KEY + KEY_SEPARATOR + 'mediaType' + KEY_SEPARATOR;
