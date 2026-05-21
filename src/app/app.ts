import { Component, effect, inject, Signal, signal } from '@angular/core';
import { AppBodyComponent } from '@features/app-body/app-body';
import { AppFooterComponent } from '@features/app-footer/app-footer';
import { AppHeaderComponent } from '@features/app-header/app-header';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [AppHeaderComponent, AppBodyComponent, AppFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  readonly #titleService: Title = inject(Title);

  readonly #title: Signal<string> = signal('Shelf Indulgence').asReadonly();

  constructor() {
    effect(() => {
      this.#titleService.setTitle(this.#title());
    });
  }
}
