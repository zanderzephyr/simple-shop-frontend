import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalizationService } from '@core/localization/localization-service';
import { SUBHEADER_KEY } from './header-company-logo-utils';

@Component({
  selector: 'app-header-company-logo',
  imports: [RouterLink],
  templateUrl: './header-company-logo.html',
  styleUrl: './header-company-logo.scss',
})
export class HeaderCompanyLogoComponent {
  readonly #localizationService: LocalizationService = inject(LocalizationService);

  protected readonly subheader: Signal<string> = computed(() =>
    this.#localizationService.getValue(SUBHEADER_KEY),
  );

  constructor() {
    // Nothing to do so far
  }
}
