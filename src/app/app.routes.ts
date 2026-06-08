import { inject } from '@angular/core';
import { Routes, CanActivateFn, Router } from '@angular/router';
import { UserType } from '@core/api/user/model/user';
import { Session, SessionData } from '@core/session';

function getSessionData(): SessionData | undefined {
  const session: Session = inject(Session);
  return session.getSessionData()();
}

const isAdminGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const userType: UserType | undefined = getSessionData()?.getUserType();
  if (UserType.ADMIN === userType) {
    return true;
  }

  return router.createUrlTree(['/']);
};

const isLoggedInGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  if (getSessionData() !== undefined) {
    return true;
  }

  return router.createUrlTree(['/']);
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },

  {
    path: 'welcome',
    loadComponent: () =>
      import('@features/app-body/body-content/welcome/welcome').then((m) => m.WelcomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@features/app-body/body-content/session-login/session-login').then(
        (m) => m.SessionLoginComponent,
      ),
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('@features/app-body/body-content/session-logout/session-logout').then(
        (m) => m.SessionLogoutComponent,
      ),
  },
  {
    path: 'shopping-cart',
    loadComponent: () =>
      import('@features/app-body/body-content/shopping-cart/shopping-cart').then(
        (m) => m.ShoppingCartComponent,
      ),
  },

  {
    path: '',
    canActivate: [isLoggedInGuard],
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('@features/app-body/body-content/profile/profile').then((m) => m.ProfileComponent),
      },
      {
        path: 'user-transactions',
        loadComponent: () =>
          import('@features/app-body/body-content/user-transactions/user-transactions').then(
            (m) => m.UserTransactionsComponent,
          ),
      },

      {
        path: '',
        canActivate: [isAdminGuard],
        children: [
          {
            path: 'global-transactions',
            loadComponent: () =>
              import('@features/app-body/body-content/global-transactions/global-transactions').then(
                (m) => m.GlobalTransactionsComponent,
              ),
          },
          {
            path: 'book-keeping',
            loadComponent: () =>
              import('@features/app-body/body-content/book-keeping/book-keeping').then(
                (m) => m.BookKeepingComponent,
              ),
          },
          {
            path: 'user-management',
            loadComponent: () =>
              import('@features/app-body/body-content/user-management/user-management').then(
                (m) => m.UserManagementComponent,
              ),
          },
          {
            path: 'inventory',
            loadComponent: () =>
              import('@features/app-body/body-content/inventory/inventory').then(
                (m) => m.InventoryComponent,
              ),
          },
        ],
      },
    ],
  },
];
