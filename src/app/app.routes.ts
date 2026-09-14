import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { UserType } from '@api/user/model/user-type';
import { SessionData } from '@core/session/session-data';
import { SessionService } from '@core/session/session-service';

const isAdminGuard: CanActivateFn = () => {
	const router: Router = inject(Router);
	const sessionService: SessionService = inject(SessionService);

	const sessionData: SessionData | undefined = sessionService.getSessionData()();
	if (sessionData !== undefined) {
		const userType: UserType = sessionData.getUserType();
		if (UserType.ADMIN === userType) {
			return true;
		}
	}

	// TODO Maybe better redirect to a "not authorized" page instead of the welcome page.
	return router.createUrlTree(['/']);
};

const isLoggedInGuard: CanActivateFn = () => {
	const router: Router = inject(Router);
	const sessionService: SessionService = inject(SessionService);

	if (sessionService.isLoggedIn()()) {
		return true;
	}

	// TODO Maybe better redirect to a "not authorized" page instead of the welcome page.
	return router.createUrlTree(['/']);
};

const isLoggedOutGuard: CanActivateFn = () => {
	const router: Router = inject(Router);
	const sessionService: SessionService = inject(SessionService);

	if (sessionService.isLoggedIn()()) {
		return router.createUrlTree(['/']);
	}

	return true;
};

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () =>
			import('@features/app-body/body-content/landing/landing').then(
				(m) => m.LandingComponent
			)
	},
	{
		path: 'logout',
		loadComponent: () =>
			import('@features/app-body/body-content/logout/logout').then(
				(m) => m.LogoutComponent
			)
	},
	{
		path: 'outage',
		loadComponent: () =>
			import('@features/app-body/body-content/outage/outage').then((m) => m.OutageComponent)
	},
	{
		path: 'settings',
		loadComponent: () =>
			import('@features/app-body/body-content/settings/settings').then((m) => m.SettingsComponent)
	},
	{
		path: 'shopping-cart',
		loadComponent: () =>
			import('@features/app-body/body-content/shopping-cart/shopping-cart').then(
				(m) => m.ShoppingCartComponent
			)
	},

	{
		path: '',
		canActivate: [isLoggedOutGuard],
		children: [
			{
				path: 'login',
				loadComponent: () =>
					import('@features/app-body/body-content/login/login').then(
						(m) => m.LoginComponent
					)
			}
		]
	},

	{
		path: '',
		canActivate: [isLoggedInGuard],
		children: [
			{
				path: 'profile',
				loadComponent: () =>
					import('@features/app-body/body-content/profile/profile').then((m) => m.ProfileComponent)
			},
			{
				path: 'user-transactions',
				loadComponent: () =>
					import('@features/app-body/body-content/user-transactions/user-transactions').then(
						(m) => m.UserTransactionsComponent
					)
			},

			{
				path: '',
				canActivate: [isAdminGuard],
				children: [
					{
						path: 'book-keeping',
						loadComponent: () =>
							import('@features/app-body/body-content/book-keeping/book-keeping').then(
								(m) => m.BookKeepingComponent
							)
					},
					{
						path: 'global-transactions',
						loadComponent: () =>
							import('@features/app-body/body-content/global-transactions/global-transactions').then(
								(m) => m.GlobalTransactionsComponent
							)
					},
					{
						path: 'inventory',
						loadComponent: () =>
							import('@features/app-body/body-content/inventory/inventory').then(
								(m) => m.InventoryComponent
							)
					},
					{
						path: 'user-management',
						loadComponent: () =>
							import('@features/app-body/body-content/user-management/user-management').then(
								(m) => m.UserManagementComponent
							)
					}
				]
			}
		]
	},

	{
		path: '**',
		redirectTo: ''
	}
];
