import { ErrorHandler, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@core/session/session-service';
import { AvailabilityError, UnauthorizedError } from '@core/utils/api-errors';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	readonly #router: Router = inject(Router);
	readonly #sessionService: SessionService = inject(SessionService);

	public constructor() {
		// Nothing to do so far
	}

	public handleError(error: unknown): void {
		// Critical System Outages / Availability Issues
		if (error instanceof AvailabilityError) {
			this.#router.navigateByUrl('/outage');
		}
		// Session expired?
		else if (error instanceof UnauthorizedError) {
			this.#sessionService.logout();
			this.#router.navigateByUrl('/login');
		}
		// Anything unexpected
		else {
			console.error('An unhandled error occurred:', error);
		}
	}
}
