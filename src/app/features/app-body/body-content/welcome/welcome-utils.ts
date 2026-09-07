import { KEY_SEPARATOR } from '@core/utils/localization-utils';
import { BODY_KEY } from '@features/app-body/app-body-utils';

const WELCOME_KEY: string = BODY_KEY + KEY_SEPARATOR + 'welcome';
export const WELCOME_MESSAGE_NO_SESSION_KEY: string = WELCOME_KEY + KEY_SEPARATOR + 'welcomeMessageNoSession';
export const WELCOME_MESSAGE_WITH_SESSION_KEY: string = WELCOME_KEY + KEY_SEPARATOR + 'welcomeMessageWithSession';
