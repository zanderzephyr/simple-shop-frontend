import { Component, computed, inject, Signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Localization } from '@core/localization/localization';
import { LocalizationService } from '@core/localization/localization-service';
import { Theme } from '@core/theme/theme';
import { ThemeService } from '@core/theme/theme-service';
import * as LocalizationKeys from './settings-utils';

interface LocalizedOption<T> {
	readonly object: T;
	readonly localizedLabel: string;
}

@Component({
	selector: 'app-settings',
	imports: [MatSelectModule, MatFormFieldModule],
	templateUrl: './settings.html',
	styleUrl: './settings.scss'
})
export class SettingsComponent {
	protected localizationService: LocalizationService = inject(LocalizationService);
	protected readonly localizedLocalizationOptions: Signal<
		readonly LocalizedOption<Localization>[]
	> = computed(() => {
		const localizationList: Localization[] = Object.values(Localization);
		const options: LocalizedOption<Localization>[] = localizationList.map((t) => {
			const localizationKey: string = LocalizationKeys.LOCALIZATION_ENUM_KEY + t.id.toLowerCase();
			const label: string = this.localizationService.getValue(localizationKey);
			return { object: t, localizedLabel: label };
		});
		return Object.freeze(options);
	});
	protected readonly chooseLocalizationText: Signal<string> = computed(() =>
		this.localizationService.getValue(LocalizationKeys.CHOOSE_LOCALIZATION_LABEL_KEY)
	);

	protected themeService: ThemeService = inject(ThemeService);
	protected readonly localizedThemeOptions: Signal<readonly LocalizedOption<Theme>[]> = computed(
		() => {
			const themesList: Theme[] = Object.values(Theme);
			const options: LocalizedOption<Theme>[] = themesList.map((t) => {
				const themeKey: string = LocalizationKeys.THEME_ENUM_KEY + t.id.toLowerCase();
				const label: string = this.localizationService.getValue(themeKey);
				return { object: t, localizedLabel: label };
			});
			return Object.freeze(options);
		}
	);
	protected readonly chooseThemeText: Signal<string> = computed(() =>
		this.localizationService.getValue(LocalizationKeys.CHOOSE_THEME_LABEL_KEY)
	);

	protected readonly settingsHeaderText: Signal<string> = computed(() =>
		this.localizationService.getValue(LocalizationKeys.SETTINGS_HEADER_KEY)
	);

	public constructor() {
		// Nothing to do so far
	}

	protected updateSelectedLocalization(localizationId: string): void {
		const selected: Localization | undefined = Object.values(Localization).find(
			(l) => l.id === localizationId
		);
		// undefined can't happen, but helps the compiler
		if (selected !== undefined) {
			this.localizationService.setLocalization(selected);
		}
	}

	protected updateSelectedTheme(themeId: string): void {
		const selected: Theme | undefined = Object.values(Theme).find((t) => t.id === themeId);
		// undefined can't happen, but helps the compiler
		if (selected !== undefined) {
			this.themeService.setTheme(selected);
		}
	}
}
