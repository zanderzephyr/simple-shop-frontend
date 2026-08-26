import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '@app/app.routes';
import { DialogService } from '@ui/dialog/interface/dialog-service';
import { NgMatDialogService } from '@ui/dialog/ng-mat-dialog/ng-mat-dialog-service';
import { SessionService } from '@core/session/session-service';
import { GlobalErrorHandler } from '@core/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes, withComponentInputBinding()),

    { provide: DialogService, useClass: NgMatDialogService },

    provideHttpClient(
      // Configures Angular to read the gateway's CSRF cookie and append the requested header
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN', // default value used by Spring Security
      }),
    ),

    provideAppInitializer(() => {
      const sessionService: SessionService = inject(SessionService);
      return sessionService.initSession();
    }),

    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
};
