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
  styleUrl: './header-session.css',
})
export class HeaderSessionComponent {
  readonly #sessionService: SessionService = inject(SessionService);
  readonly #userService: UserService = inject(UserService);
  readonly #router: Router = inject(Router);

  protected readonly isLoggedIn: Signal<boolean> = this.#sessionService.isLoggedIn();

  protected readonly isAdmin: Signal<boolean> = computed(() => {
    const sessionData: SessionData | null = this.#sessionService.getSessionData()();
    return sessionData !== null && sessionData.getUserType() === UserType.ADMIN;
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

  protected onLoginClick(): void {
    /*
			What I do right now is very insecure. We should usually have our own subdomain
			handle the login on a very secure and restricted server. No other content
			besides the login fields should exist on the frontend for that subdomain, to
			prevent malicious JS to sniff at the DOM. That content is outside of the actual
			app.

			All that doesn't matter for now, this is just for practice.
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

  protected onUserTransactionsClick(): void {
    this.#router.navigate(['/user-transactions']);
  }

  protected onShoppingCartClick(): void {
    this.#router.navigate(['/shopping-cart']);
  }

  protected onGlobalTransactionsClick(): void {
    this.#router.navigate(['/global-transactions']);
  }

  protected onBookKeepingClick(): void {
    this.#router.navigate(['/book-keeping']);
  }

  protected onInventoryClick(): void {
    this.#router.navigate(['/inventory']);
  }

  protected onUserManagementClick(): void {
    this.#router.navigate(['/user-management']);
  }
}
