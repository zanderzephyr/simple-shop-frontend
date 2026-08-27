import { Component, computed, inject, Signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Localization } from '@core/localization/localization';
import { LocalizationService } from '@core/localization/localization-service';
import { Theme } from '@core/theme/theme';
import { ThemeService } from '@core/theme/theme-service';
import {
  CHOOSE_LOCALIZATION_LABEL_KEY,
  CHOOSE_THEME_LABEL_KEY,
  LOCALIZATION_ENUM_KEY,
  SETTINGS_HEADER_KEY,
  THEME_ENUM_KEY,
} from './settings-utils';

const settingsContextSegment: string = 'settings';

interface LocalizedOption<T> {
  readonly object: T;
  readonly localizedLabel: string;
}

@Component({
  selector: 'app-settings',
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class SettingsComponent {
  protected localizationService: LocalizationService = inject(LocalizationService);
  protected readonly localizedLocalizationOptions: Signal<
    readonly LocalizedOption<Localization>[]
  > = computed(() => {
    const localizationList: Localization[] = Object.values(Localization);
    const options: LocalizedOption<Localization>[] = localizationList.map((t) => {
      const localizationKey: string = LOCALIZATION_ENUM_KEY + t.localizationKey;
      const label: string = this.localizationService.getValue(localizationKey);
      return { object: t, localizedLabel: label };
    });
    return Object.freeze(options);
  });
  protected readonly chooseLocalizationLabel: Signal<string> = computed(() =>
    this.localizationService.getValue(CHOOSE_LOCALIZATION_LABEL_KEY),
  );

  protected themeService: ThemeService = inject(ThemeService);
  protected readonly localizedThemeOptions: Signal<readonly LocalizedOption<Theme>[]> = computed(
    () => {
      const themesList: Theme[] = Object.values(Theme);
      const options: LocalizedOption<Theme>[] = themesList.map((t) => {
        const themeKey: string = THEME_ENUM_KEY + t.localizationKey;
        const label: string = this.localizationService.getValue(themeKey);
        return { object: t, localizedLabel: label };
      });
      return Object.freeze(options);
    },
  );
  protected readonly chooseThemeLabel: Signal<string> = computed(() =>
    this.localizationService.getValue(CHOOSE_THEME_LABEL_KEY),
  );

  protected readonly settingsHeader: Signal<string> = computed(() =>
    this.localizationService.getValue(SETTINGS_HEADER_KEY),
  );

  public constructor() {
    // Nothing to do so far
  }

  protected updateSelectedLocalization(localizationId: string): void {
    const selected: Localization | undefined = Object.values(Localization).find(
      (l) => l.id === localizationId,
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
