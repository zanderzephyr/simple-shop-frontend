import { signal, Signal, Injectable, WritableSignal, inject } from '@angular/core';
import { LoginCredentials } from './model/login-credentials';
import { Session, SessionData } from '@core/session';
import { UserType } from '@core/api/user/model/user';

let INSTANCE: SessionService | null = null;

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    if (!INSTANCE) {
      INSTANCE = new ApiSessionService();
    }
    return INSTANCE;
  },
})
export abstract class SessionService {
  public abstract login(loginCredentials: LoginCredentials): void;

  public abstract logout(): void;
}

@Injectable() // Necessary for future dependency injection, even if this class is never directly injected.
class ApiSessionService extends SessionService {
  readonly #session: Session = inject(Session);

  constructor() {
    if (INSTANCE) {
      throw new Error(
        'Instantiation failed: ' +
          ApiSessionService.name +
          ' is a singleton managed by the framework. Manual creation or re-providing is forbidden.',
      );
    } else {
      super();
    }
  }

  // This is just a test implementation. The rest needs a proper backend.
  public login(loginCredentials: LoginCredentials): void {
    const sessionData: SessionData = new SessionData(
      loginCredentials.getUsername(),
      UserType.ADMIN,
    );
    this.#session.logIn(sessionData);
  }

  // This is just a test implementation. The rest needs a proper backend.
  public logout(): void {
    this.#session.logOut();
  }
}
