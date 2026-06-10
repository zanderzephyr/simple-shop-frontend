import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { DialogService } from '@ui/dialog/interface/dialog-service';
import { NgMatDialogService } from '@ui/dialog/ng-mat-dialog/ng-mat-dialog-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: DialogService, useClass: NgMatDialogService },
  ],
};
