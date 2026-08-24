import { Component, computed, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserService } from '@api/user/user-service';
import { UserType } from '@api/user/model/user-type';
import { SessionService } from '@core/session/session-service';
import { SessionData } from '@core/session/session-data';

@Component({
  selector: 'app-header-session',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule],
  templateUrl: './header-session.html',
  styleUrl: './header-session.scss',
})
export class HeaderSessionComponent {
  readonly #sessionService: SessionService = inject(SessionService);
  readonly #userService: UserService = inject(UserService);
  readonly #router: Router = inject(Router);

  protected readonly isLoggedIn: Signal<boolean> = this.#sessionService.isLoggedIn();

  protected readonly isAdmin: Signal<boolean> = computed(() => {
    const sessionData: SessionData | undefined = this.#sessionService.getSessionData()();
    return sessionData !== undefined && sessionData.getUserType() === UserType.ADMIN;
  });

  /*() => {
    const sessionData: SessionData | null = this.#sessionService.getSessionData()();
    if (sessionData) {
      const userType: UserType | null = await this.#userService.getUserType(
        sessionData.getUserId(),
      );
      return UserType.ADMIN === userType;
    }
    return false;
  });*/

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
