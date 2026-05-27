import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },

  {
    path: 'welcome',
    loadComponent: () =>
      import('@app/features/app-body/body-content/welcome/welcome').then((m) => m.WelcomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@app/features/app-body/body-content/session-login/session-login').then(
        (m) => m.SessionLoginComponent,
      ),
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('@app/features/app-body/body-content/session-logout/session-logout').then(
        (m) => m.SessionLogoutComponent,
      ),
  },
  {
    path: 'shopping-cart',
    loadComponent: () =>
      import('@app/features/app-body/body-content/shopping-cart/shopping-cart').then(
        (m) => m.ShoppingCartComponent,
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('@app/features/app-body/body-content/profile/profile').then((m) => m.ProfileComponent),
  },
  {
    path: 'user-transactions',
    loadComponent: () =>
      import('@app/features/app-body/body-content/user-transactions/user-transactions').then(
        (m) => m.UserTransactionsComponent,
      ),
  },
];
