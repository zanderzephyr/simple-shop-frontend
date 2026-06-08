import { Injectable, inject } from '@angular/core';
import { LoginCredentials } from './model/login-credentials';
import { Session, SessionData } from '@core/session';
import { UserType } from '@api/user/model/user';

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
  /**
   * Tries to authorize the current session with the backend using
   * the login credentials.
   *
   * If authorization succeeds, the session for this app switches to
   * logged in state and this method returns true. If authorization
   * fails, this method returns false.
   */
  // TODO Reconsider return value
  public abstract login(loginCredentials: LoginCredentials): Promise<boolean>;

  // TODO Document and reconsider return value
  public abstract logout(): Promise<void>;
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

  // TODO This is just a test implementation. The rest needs a proper backend.
  public override async login(loginCredentials: LoginCredentials): Promise<boolean> {
    const sessionData: SessionData = new SessionData(
      loginCredentials.getUsername(),
      UserType.ADMIN,
    );
    this.#session.logIn(sessionData);

    return true;
  }

  // TODO This is just a test implementation. The rest needs a proper backend.
  public override async logout(): Promise<void> {
    this.#session.logOut();
  }
}
