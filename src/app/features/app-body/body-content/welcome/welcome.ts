import { Component, computed, inject, Signal } from '@angular/core';
import { LocalizationService } from '@core/localization/localization-service';
import { SessionService } from '@core/session/session-service';
import * as Keys from './welcome-utils';

@Component({
	selector: 'app-welcome',
	imports: [],
	templateUrl: './welcome.html',
	styleUrl: './welcome.scss'
})
export class WelcomeComponent {
	readonly #sessionService: SessionService = inject(SessionService);

	readonly #localizationService: LocalizationService = inject(LocalizationService);
	protected readonly welcomeMessageNoSessionText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.WELCOME_MESSAGE_NO_SESSION_KEY));
	protected readonly welcomeMessageWithSessionText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.WELCOME_MESSAGE_WITH_SESSION_KEY));

	protected readonly isLoggedIn: Signal<boolean> = computed(() =>
		this.#sessionService.isLoggedIn()()
	);

	protected readonly username: Signal<string | undefined> = computed(() =>
		this.#sessionService.getSessionData()()?.getUsername()
	);

	constructor() {
		// Nothing to do so far
	}
}
