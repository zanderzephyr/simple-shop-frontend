import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Localization } from '@core/localization/localization';
import { LocalizationService } from '@core/localization/localization-service';
import { Theme } from '@core/theme/theme';
import { ThemeService } from '@core/theme/theme-service';

@Component({
  selector: 'app-settings',
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class SettingsComponent {
  readonly #localizationService: LocalizationService = inject(LocalizationService);
  readonly #themeService: ThemeService = inject(ThemeService);

  protected readonly localizations: Signal<readonly Localization[]> = signal(
    Object.freeze(Object.values(Localization)),
  ).asReadonly();

  protected readonly themes: Signal<readonly Theme[]> = signal(
    Object.freeze(Object.values(Theme)),
  ).asReadonly();

  protected readonly selectedLocalization: WritableSignal<Localization> = signal(
    this.#localizationService.getLocalization()(),
  );

  protected readonly selectedTheme: WritableSignal<Theme> = signal(this.#themeService.getTheme()());

  public constructor() {
    effect(() => {
      const localization: Localization = this.#localizationService.getLocalization()();
      this.selectedLocalization.set(localization);
    });
    effect(() => {
      const theme: Theme = this.#themeService.getTheme()();
      this.selectedTheme.set(theme);
    });
  }

  protected updateSelectedLocalization(localization: Localization): void {
    this.#localizationService.setLocalization(localization);
  }

  protected updateSelectedTheme(theme: Theme): void {
    this.#themeService.setTheme(theme);
  }
}
