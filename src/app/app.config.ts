import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { ApiItemService, ItemService } from '@features/item/item.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    /*
		This tells Angular: "If someone asks for the Abstract ItemService,
   	use ApiItemService by default." For tests, this can be replaced
		with a mock server by using "TestBed.overrideProvider". So this
		creates an ApiItemService singleton I assume. Any parameters
		this service needs are resolved with DI as well.
		*/
    { provide: ItemService, useClass: ApiItemService },
  ],
};
