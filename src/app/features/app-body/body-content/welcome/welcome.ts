import { Component, computed, inject, Signal } from '@angular/core';
import { Session } from '@app/core/session/session-service';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class WelcomeComponent {
  readonly #session: Session = inject(Session);

  protected readonly isLoggedIn: Signal<boolean> = computed(() => this.#session.isLoggedIn()());

  protected readonly username: Signal<string | undefined> = computed(() =>
    this.#session.getSessionData()()?.getUsername(),
  );

  constructor() {
    // Nothing to do so far
  }
}
