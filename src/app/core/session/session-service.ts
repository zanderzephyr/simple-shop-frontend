import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
  forwardRef,
  inject,
} from '@angular/core';
import { SessionData, SessionDataBuilder } from './session-data';
import { AuthService } from '@api/auth/auth.service';
import { LoginResponse } from '@api/auth/model/login-response';
import { LoginRequest } from '@api/auth/model/login-request';
import { CurrentUser } from '@api/auth/model/current-user';
import { UserService } from '@api/user/user-service';
import { User } from '@api/user/model/user';

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
  public abstract getSessionData(): Signal<SessionData | null>;

  // TODO Document
  public abstract isLoggedIn(): Signal<boolean>;
}

@Injectable()
class CoreSessionService extends SessionService {
  readonly #authService = inject(AuthService);
  readonly #userService = inject(UserService);

  readonly #sessionData: WritableSignal<SessionData | null> = signal(null);

  readonly #isLoggedIn: Signal<boolean> = computed(() => this.#sessionData() !== null);

  constructor() {
    super();
  }

  public override async login(loginRequest: LoginRequest): Promise<boolean> {
    let sessionData: SessionData | null = null;

    const loginResponse: LoginResponse = await this.#authService.login(loginRequest);

    if (loginResponse.getCredentialsOk()) {
      sessionData = await this.#createSessionDataFromCurrentUser(loginResponse.getUserId()!);
    }

    this.#sessionData.set(sessionData);

    return sessionData !== null;
  }

  async #createSessionDataFromCurrentUser(userId: bigint): Promise<SessionData | null> {
    const user: User | null = await this.#userService.getUserById(userId);

    if (user === null) {
      return null;
    }

    return new SessionDataBuilder()
      .setUserId(userId)
      .setUsername(user.getUsername())
      .setUserType(user.getUserType())
      .build();
  }

  public override async logout(): Promise<void> {
    await this.#authService.logout();
    this.#sessionData.set(null);
  }

  public override async initSession(): Promise<void> {
    let sessionData: SessionData | null = null;

    const currentUser: CurrentUser | null = await this.#authService.getCurrentUser();
    if (currentUser !== null) {
      sessionData = await this.#createSessionDataFromCurrentUser(currentUser.getUserId());
    }

    /*
     * There could still be a session cookie. In this case, we log out and let the
     *  cookie be deleted in the process.
     */
    if (sessionData === null) {
      await this.logout();
    }

    this.#sessionData.set(sessionData);
  }

  public override getSessionData(): Signal<SessionData | null> {
    return this.#sessionData.asReadonly();
  }

  public override isLoggedIn(): Signal<boolean> {
    return this.#isLoggedIn;
  }
}
