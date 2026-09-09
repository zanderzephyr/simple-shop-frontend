import { Component, computed, inject, Signal } from '@angular/core';
import { LocalizationService } from '@core/localization/localization-service';
import * as LocalizationKeys from './header-company-logo-utils';

@Component({
	selector: 'app-header-company-logo',
	imports: [],
	templateUrl: './header-company-logo.html',
	styleUrl: './header-company-logo.scss'
})
export class HeaderCompanyLogoComponent {
	readonly #localizationService: LocalizationService = inject(LocalizationService);

	protected readonly subheaderText: Signal<string> = computed(() =>
		this.#localizationService.getValue(LocalizationKeys.SUBHEADER_KEY)
	);

	constructor() {
		// Nothing to do so far
	}
}
