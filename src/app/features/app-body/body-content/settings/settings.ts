import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Theme } from '@core/theme/theme';
import { ThemeService } from '@core/theme/theme-service';

@Component({
  selector: 'app-settings',
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class SettingsComponent {
  readonly #themeService: ThemeService = inject(ThemeService);

  protected readonly themes: Signal<readonly Theme[]> = signal(
    Object.freeze(Object.values(Theme)),
  ).asReadonly();

  protected readonly selectedTheme: WritableSignal<Theme> = signal(this.#themeService.getTheme()());

  public constructor() {
    effect(() => {
      const theme: Theme = this.#themeService.getTheme()();
      this.selectedTheme.set(theme);
    });
  }

  protected updateSelectedTheme(theme: Theme): void {
    this.#themeService.setTheme(theme);
  }
}
