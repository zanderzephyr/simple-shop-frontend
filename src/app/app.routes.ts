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
    path: 'basket',
    loadComponent: () =>
      import('@app/features/app-body/body-content/basket/basket').then((m) => m.BasketComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('@app/features/app-body/body-content/profile/profile').then((m) => m.ProfileComponent),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('@app/features/app-body/body-content/transactions/transactions').then(
        (m) => m.TransactionsComponent,
      ),
  },
];
