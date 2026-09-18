import { Component, computed, inject, Signal } from '@angular/core';
import { LocalizationService } from '@core/localization/localization-service';
import * as Keys from './logout-utils';

@Component({
	selector: 'app-logout',
	imports: [],
	templateUrl: './logout.html',
	styleUrl: './logout.scss'
})
export class LogoutComponent {
	readonly #localizationService: LocalizationService = inject(LocalizationService);
	protected readonly logoutMessageText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.LOGOUT_MESSAGE_KEY));

	public constructor() {
		// Nothing to do so far
	}
}
