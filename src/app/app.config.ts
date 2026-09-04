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
import { routes } from '@app/app.routes';
import { GlobalErrorHandler } from '@core/global-error-handler';
import { SessionService } from '@core/session/session-service';
import { DialogService } from '@ui/dialog/interface/dialog-service';
import { NgMatDialogService } from '@ui/dialog/ng-mat-dialog/ng-mat-dialog-service';
import { NgMatPaginatorLocalizationService } from '@ui/paginator/ng-mat-paginator-localization.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),

		provideRouter(routes, withComponentInputBinding()),

		{ provide: DialogService, useClass: NgMatDialogService },

		provideHttpClient(
			// Configures Angular to read the gateway's CSRF cookie and append the requested header
			withXsrfConfiguration({
				cookieName: 'XSRF-TOKEN',
				headerName: 'X-XSRF-TOKEN' // default value used by Spring Security
			})
		),

		provideAppInitializer(() => {
			const sessionService: SessionService = inject(SessionService);
			return sessionService.initSession();
		}),

		{ provide: ErrorHandler, useClass: GlobalErrorHandler },

		{ provide: MatPaginatorIntl, useClass: NgMatPaginatorLocalizationService }
	]
};
