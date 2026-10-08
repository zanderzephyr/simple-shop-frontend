import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
import {
	ApplicationConfig,
	ErrorHandler,
	inject,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners
} from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ApiItemImageService } from '@api/item/item-image/api-item-image-service';
import { ItemImageService } from '@api/item/item-image/item-image-service';
import { routes } from '@app/app.routes';
import { ApiAuthService } from '@core/api/auth/api-auth-service';
import { AuthService } from '@core/api/auth/auth-service';
import { ApiItemService } from '@core/api/item/api-item-service';
import { ItemService } from '@core/api/item/item-service';
import { ApiUserService } from '@core/api/user/api-user-service';
import { UserService } from '@core/api/user/user-service';
import { GlobalErrorHandler } from '@core/global-error-handler';
import { CoreLocalizationService } from '@core/localization/core-localization-service';
import { LocalizationService } from '@core/localization/localization-service';
import { CoreSessionService } from '@core/session/core-session-service';
import { SessionService } from '@core/session/session-service';
import { CoreThemeService } from '@core/theme/core-theme-service';
import { ThemeService } from '@core/theme/theme-service';
import { DialogService } from '@ui/dialog/interface/dialog-service';
import { NgMatDialogService } from '@ui/dialog/ng-mat-dialog/ng-mat-dialog-service';
import { NgMatPaginatorLocalizationService } from '@ui/paginator/ng-mat-paginator-localization.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),

		provideRouter(routes, withComponentInputBinding()),

		{ provide: AuthService, useClass: ApiAuthService },
		{ provide: DialogService, useClass: NgMatDialogService },
		{ provide: ItemService, useClass: ApiItemService },
		{ provide: ItemImageService, useClass: ApiItemImageService },
		{ provide: LocalizationService, useClass: CoreLocalizationService },
		{ provide: SessionService, useClass: CoreSessionService },
		{ provide: ThemeService, useClass: CoreThemeService },
		{ provide: UserService, useClass: ApiUserService },

		provideHttpClient(
			// Configures Angular to read the gateway's CSRF cookie and append the requested header
			withXsrfConfiguration({
				cookieName: 'XSRF-TOKEN',
				headerName: 'X-XSRF-TOKEN' // default value used by Spring Security
			})
		),

		provideAppInitializer((): Promise<void> => {
			const sessionService: SessionService = inject(SessionService);
			return sessionService.initSession();
		}),

		{ provide: ErrorHandler, useClass: GlobalErrorHandler },

		{ provide: MatPaginatorIntl, useClass: NgMatPaginatorLocalizationService }
	]
};
