import { Component, computed, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserType } from '@api/user/model/user-type';
import { LocalizationService } from '@core/localization/localization-service';
import { SessionData } from '@core/session/session-data';
import { SessionService } from '@core/session/session-service';
import * as LocalizationKeys from './header-session-utils';

@Component({
	selector: 'app-header-session',
	imports: [MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule],
	templateUrl: './header-session.html',
	styleUrl: './header-session.scss'
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

	protected readonly bookKeepingText: Signal<string> = computed(() =>
		this.#localizationService.getValue(LocalizationKeys.BOOK_KEEPING_KEY)
	);

	protected readonly globalTransactionsText: Signal<string> = computed(() =>
		this.#localizationService.getValue(LocalizationKeys.GLOBAL_TRANSACTIONS_KEY)
	);

	protected readonly inventoryText: Signal<string> = computed(() =>
		this.#localizationService.getValue(LocalizationKeys.INVENTORY_KEY)
	);

	protected readonly loginText: Signal<string> = computed(() =>
		this.#localizationService.getValue(LocalizationKeys.LOGIN_KEY)
	);

	protected readonly logoutText: Signal<string> = computed(() =>
		this.#localizationService.getValue(LocalizationKeys.LOGOUT_KEY)
	);

	protected readonly managementText: Signal<string> = computed(() =>
		this.#localizationService.getValue(LocalizationKeys.MANAGEMENT_KEY)
	);

	protected readonly profileText: Signal<string> = computed(() =>
		this.#localizationService.getValue(LocalizationKeys.PROFILE_KEY)
	);

	protected readonly sessionText: Signal<string> = computed(() =>
		this.#localizationService.getValue(LocalizationKeys.SESSION_KEY)
	);

	protected readonly transactionsText: Signal<string> = computed(() =>
		this.#localizationService.getValue(LocalizationKeys.TRANSACTIONS_KEY)
	);

	protected readonly userManagementText: Signal<string> = computed(() =>
		this.#localizationService.getValue(LocalizationKeys.USER_MANAGEMENT_KEY)
	);

	constructor() {
		// Nothing to do so far
	}

	protected onBookKeepingClick(): void {
		void this.#router.navigate(['/book-keeping']);
	}

	protected onGlobalTransactionsClick(): void {
		void this.#router.navigate(['/global-transactions']);
	}

	protected onInventoryClick(): void {
		void this.#router.navigate(['/inventory']);
	}

	protected onLoginClick(): void {
		/*
		 *	TODO This is insecure. We should have our own subdomain
		 *	handle the login on a secure and restricted server. No other content
		 *	besides the login fields should exist on the frontend of that subdomain, to
		 *	prevent malicious JS to sniff at the DOM. That content must be outside of the actual
		 *	app.
		 */
		void this.#router.navigate(['/login']);
	}

	protected async onLogoutClick(): Promise<void> {
		await this.#sessionService.logout();

		void this.#router.navigate(['/logout']);
	}

	protected onProfileClick(): void {
		void this.#router.navigate(['/profile']);
	}

	protected onSettingsClick(): void {
		void this.#router.navigate(['/settings']);
	}

	protected onShoppingCartClick(): void {
		void this.#router.navigate(['/shopping-cart']);
	}

	protected onUserManagementClick(): void {
		void this.#router.navigate(['/user-management']);
	}

	protected onUserTransactionsClick(): void {
		void this.#router.navigate(['/user-transactions']);
	}
}
