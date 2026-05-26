import { Component, computed, inject, Signal } from '@angular/core';
import { UserType } from '@app/core/api/user/model/user';
import { Session, SessionData } from '@app/core/session';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { SessionService } from '@app/core/api/session/session.service';

@Component({
  selector: 'app-header-session',
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './header-session.html',
  styleUrl: './header-session.css',
})
export class HeaderSessionComponent {
  readonly #session: Session = inject(Session);
  readonly #router: Router = inject(Router);
  readonly #sessionService: SessionService = inject(SessionService);

  readonly #sessionData: Signal<SessionData | undefined> = this.#session.getSessionData();

  protected readonly isLoggedIn: Signal<boolean> = computed(
    () => this.#sessionData() !== undefined,
  );

  protected readonly isAdmin: Signal<boolean> = computed(
    () => this.#sessionData()?.getUserType() === UserType.ADMIN,
  );

  constructor() {
    // Nothing to do so far
  }

  protected onLoginClick(): void {
    /*
			What I do right now is very insecure. We should usually have our own subdomain
			handle the login on a very secure and restricted server. No other content
			besides the login fields should exist on the frontend for that subdomain, to
			prevent malicious JS to sniff at the DOM. That content is outside of the actual
			app.

			All that doesn't matter for now, this is just for practice.
		*/
    this.#router.navigate(['/login']);
  }

  protected async onLogoutClick(): Promise<void> {
    await this.#sessionService.logout();

    this.#router.navigate(['/logout']);
  }
}
