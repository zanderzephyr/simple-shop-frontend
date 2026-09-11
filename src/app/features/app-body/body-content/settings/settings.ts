import { Component, computed, inject, Signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Localization } from '@core/localization/localization';
import { LocalizationService } from '@core/localization/localization-service';
import { Theme } from '@core/theme/theme';
import { ThemeService } from '@core/theme/theme-service';
import { LocalizedObject } from '@core/utils/localization-utils';
import * as LocalizationKeys from './settings-utils';

@Component({
	selector: 'app-settings',
	imports: [MatSelectModule, MatFormFieldModule],
	templateUrl: './settings.html',
	styleUrl: './settings.scss'
})
export class SettingsComponent {
	protected localizationService: LocalizationService = inject(LocalizationService);

	protected readonly localizedLocalizations: Signal<
		readonly LocalizedObject<Localization>[]
	> = computed(() => {
		const localizationList: Localization[] = Object.values(Localization);
		const options: LocalizedObject<Localization>[] = localizationList.map((t) => {
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
	protected readonly localizedThemes: Signal<readonly LocalizedObject<Theme>[]> = computed(
		() => {
			const themesList: Theme[] = Object.values(Theme);
			const options: LocalizedObject<Theme>[] = themesList.map((t) => {
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

	protected updateSelectedLocalization(localization: Localization): void {
		this.localizationService.setLocalization(localization);
	}

	protected updateSelectedTheme(theme: Theme): void {
		this.themeService.setTheme(theme);
	}
}
