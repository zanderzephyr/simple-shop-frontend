import { Component, effect, inject, Signal, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppBodyComponent } from '@features/app-body/app-body';
import { AppFooterComponent } from '@features/app-footer/app-footer';
import { AppHeaderComponent } from '@features/app-header/app-header';
import { ThemeService } from '@core/theme/theme-service';

@Component({
  selector: 'app-root',
  imports: [AppHeaderComponent, AppBodyComponent, AppFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  readonly #titleService: Title = inject(Title);

  readonly #title: Signal<string> = signal('Shelf Indulgence').asReadonly();

  constructor() {
    // Initializes the stored or default theme
    inject(ThemeService);

    effect(() => {
      this.#titleService.setTitle(this.#title());
    });
  }
}
