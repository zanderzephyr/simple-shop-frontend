import { Component, computed, inject, input, InputSignal, signal, Signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Localization } from '@core/localization/localization';
import { LocalizationService } from '@core/localization/localization-service';
import { Theme } from '@core/theme/theme';
import { ThemeService } from '@core/theme/theme-service';

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
  public readonly contextPath: InputSignal<string> = input('');
  readonly #settingsContextPath: Signal<string> = computed(
    () => this.contextPath() + '.' + settingsContextSegment,
  );

  protected localizationService: LocalizationService = inject(LocalizationService);
  protected readonly localizedLocalizationOptions: Signal<
    readonly LocalizedOption<Localization>[]
  > = computed(() => {
    const localizationList: Localization[] = Object.values(Localization);
    const options: LocalizedOption<Localization>[] = localizationList.map((t) => {
      const localizationKey: string = 'app.global.enums.localization.' + t.localizationKey;
      const label: string = this.localizationService.getValue(localizationKey);
      return { object: t, localizedLabel: label };
    });
    return Object.freeze(options);
  });
  protected readonly chooseLocalizationLabel: Signal<string> = computed(() => {
    const chooseLocalizationLabelKey: string =
      this.#settingsContextPath() + '.ui.localization.chooseLocalizationLabel';
    return this.localizationService.getValue(chooseLocalizationLabelKey);
  });

  protected themeService: ThemeService = inject(ThemeService);
  protected readonly localizedThemeOptions: Signal<readonly LocalizedOption<Theme>[]> = computed(
    () => {
      const themesList: Theme[] = Object.values(Theme);
      const options: LocalizedOption<Theme>[] = themesList.map((t) => {
        const themeKey: string = 'app.global.enums.theme.' + t.localizationKey;
        const label: string = this.localizationService.getValue(themeKey);
        return { object: t, localizedLabel: label };
      });
      return Object.freeze(options);
    },
  );
  protected readonly chooseThemeLabel: Signal<string> = computed(() => {
    const chooseThemeLabelKey: string = this.#settingsContextPath() + '.ui.theme.chooseThemeLabel';
    return this.localizationService.getValue(chooseThemeLabelKey);
  });

  protected readonly settingsHeader: Signal<string> = computed(() => {
    const settingsHeaderKey: string = this.#settingsContextPath() + '.header';
    return this.localizationService.getValue(settingsHeaderKey);
  });

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
