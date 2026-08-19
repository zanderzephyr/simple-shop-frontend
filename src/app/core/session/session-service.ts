import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
  forwardRef,
  inject,
} from '@angular/core';
import { SessionData } from './session-data';
import { AuthService } from '@api/auth/auth.service';
import { LoginResponse } from '@api/auth/model/login-response';
import { LoginRequest } from '@api/auth/model/login-request';
import { CurrentUser } from '../api/auth/model/current-user';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => CoreSessionService),
})
export abstract class SessionService {
  public constructor() {}

  /**
   * Attempts to log in the user with the provided login credentials.
   * @param loginRequest The login credentials to use for authentication.
   * @returns A promise that resolves to true if the login was successful, or false if the credentials were invalid.
   */
  public abstract login(loginRequest: LoginRequest): Promise<boolean>;

  // TODO Document
  public abstract logout(): Promise<void>;

  // TODO Document
  public abstract initSession(): Promise<void>;

  // TODO Document
  public abstract getSessionData(): Signal<SessionData | undefined>;

  // TODO Document
  public abstract isLoggedIn(): Signal<boolean>;
}

@Injectable()
class CoreSessionService extends SessionService {
  readonly #sessionData: WritableSignal<SessionData | undefined> = signal(undefined);

  readonly #isLoggedIn: Signal<boolean> = computed(() => this.#sessionData() !== undefined);

  readonly #authService = inject(AuthService);

  constructor() {
    super();
  }

  public override async login(loginRequest: LoginRequest): Promise<boolean> {
    const loginResponse: LoginResponse = await this.#authService.login(loginRequest);

    if (loginResponse.getCredentialsOk()) {
      this.#sessionData.set(new SessionData(loginResponse.getUserId()!));

      return true;
    }
    return false;
  }

  public override async logout(): Promise<void> {
    await this.#authService.logout();
    this.#sessionData.set(undefined);
  }

  public override async initSession(): Promise<void> {
    const currentUser: CurrentUser | undefined = await this.#authService.getCurrentUser();
    if (currentUser) {
      this.#sessionData.set(new SessionData(currentUser.getUserId()));
    } else {
      this.#sessionData.set(undefined);
    }
  }

  public override getSessionData(): Signal<SessionData | undefined> {
    return this.#sessionData.asReadonly();
  }

  public override isLoggedIn(): Signal<boolean> {
    return this.#isLoggedIn;
  }
}
