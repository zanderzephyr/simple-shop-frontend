import { Component, computed, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserType } from '@api/user/model/user-type';
import { SessionService } from '@core/session/session-service';
import { SessionData } from '@core/session/session-data';
import { LocalizationService } from '@core/localization/localization-service';
import * as LocalizationKeys from './header-session-utils';

@Component({
  selector: 'app-header-session',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule],
  templateUrl: './header-session.html',
  styleUrl: './header-session.scss',
})
export class HeaderSessionComponent {
  readonly #sessionService: SessionService = inject(SessionService);
  readonly #localizationService: LocalizationService = inject(LocalizationService);
  readonly #router: Router = inject(Router);

  protected readonly isLoggedIn: Signal<boolean> = this.#sessionService.isLoggedIn();

  protected readonly isAdmin: Signal<boolean> = computed(() => {
    const sessionData: SessionData | undefined = this.#sessionService.getSessionData()();
    return sessionData !== undefined && sessionData.getUserType() === UserType.ADMIN;
  });

  protected readonly bookKeeping: Signal<string> = computed(() =>
    this.#localizationService.getValue(LocalizationKeys.BOOK_KEEPING_KEY),
  );

  protected readonly globalTransactions: Signal<string> = computed(() =>
    this.#localizationService.getValue(LocalizationKeys.GLOBAL_TRANSACTIONS_KEY),
  );

  protected readonly inventory: Signal<string> = computed(() =>
    this.#localizationService.getValue(LocalizationKeys.INVENTORY_KEY),
  );

  protected readonly login: Signal<string> = computed(() =>
    this.#localizationService.getValue(LocalizationKeys.LOGIN_KEY),
  );

  protected readonly logout: Signal<string> = computed(() =>
    this.#localizationService.getValue(LocalizationKeys.LOGOUT_KEY),
  );

  protected readonly management: Signal<string> = computed(() =>
    this.#localizationService.getValue(LocalizationKeys.MANAGEMENT_KEY),
  );

  protected readonly profile: Signal<string> = computed(() =>
    this.#localizationService.getValue(LocalizationKeys.PROFILE_KEY),
  );

  protected readonly session: Signal<string> = computed(() =>
    this.#localizationService.getValue(LocalizationKeys.SESSION_KEY),
  );

  protected readonly transactions: Signal<string> = computed(() =>
    this.#localizationService.getValue(LocalizationKeys.TRANSACTIONS_KEY),
  );

  protected readonly userManagement: Signal<string> = computed(() =>
    this.#localizationService.getValue(LocalizationKeys.USER_MANAGEMENT_KEY),
  );

  constructor() {
    // Nothing to do so far
  }

  protected onBookKeepingClick(): void {
    this.#router.navigate(['/book-keeping']);
  }

  protected onGlobalTransactionsClick(): void {
    this.#router.navigate(['/global-transactions']);
  }

  protected onInventoryClick(): void {
    this.#router.navigate(['/inventory']);
  }

  protected onLoginClick(): void {
    /*
     *	TODO This is insecure. We should have our own subdomain
     *	handle the login on a secure and restricted server. No other content
     *	besides the login fields should exist on the frontend of that subdomain, to
     *	prevent malicious JS to sniff at the DOM. That content must be outside of the actual
     *	app.
     */
    this.#router.navigate(['/login']);
  }

  protected async onLogoutClick(): Promise<void> {
    await this.#sessionService.logout();

    this.#router.navigate(['/logout']);
  }

  protected onProfileClick(): void {
    this.#router.navigate(['/profile']);
  }

  protected onSettingsClick(): void {
    this.#router.navigate(['/settings']);
  }

  protected onShoppingCartClick(): void {
    this.#router.navigate(['/shopping-cart']);
  }

  protected onUserManagementClick(): void {
    this.#router.navigate(['/user-management']);
  }

  protected onUserTransactionsClick(): void {
    this.#router.navigate(['/user-transactions']);
  }
}
