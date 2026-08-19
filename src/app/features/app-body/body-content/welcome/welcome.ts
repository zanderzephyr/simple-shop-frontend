import { Component, computed, inject, Signal } from '@angular/core';
import { SessionService } from '@app/core/session/session-service';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class WelcomeComponent {
  readonly #sessionService: SessionService = inject(SessionService);

  protected readonly isLoggedIn: Signal<boolean> = computed(() =>
    this.#sessionService.isLoggedIn()(),
  );

  protected readonly username: Signal<string | undefined> = computed(() =>
    this.#sessionService.getSessionData()()?.getUsername(),
  );

  constructor() {
    // Nothing to do so far
  }
}
