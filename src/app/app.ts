import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Title } from '@angular/platform-browser';
import { LocalizationService } from '@core/localization/localization-service';
import { ThemeService } from '@core/theme/theme-service';
import { AppBodyComponent } from '@features/app-body/app-body';
import { AppFooterComponent } from '@features/app-footer/app-footer';
import { AppHeaderComponent } from '@features/app-header/app-header';

@Component({
	selector: 'app-root',
	imports: [AppHeaderComponent, AppBodyComponent, AppFooterComponent, MatProgressSpinnerModule],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class AppComponent {
	readonly #titleService: Title = inject(Title);
	readonly #title: Signal<string> = signal('Shelf Indulgence').asReadonly();

	readonly #localizationService: LocalizationService = inject(LocalizationService);

	protected readonly isFullyInitialized: Signal<boolean> = computed(() =>
		this.#localizationService.isInitialized()()
	);

	constructor() {
		// Initializes the stored or default theme
		inject(ThemeService);

		effect(() => {
			this.#titleService.setTitle(this.#title());
		});
	}
}
