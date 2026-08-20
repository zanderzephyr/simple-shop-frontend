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
import { ObjectNotFoundError } from '@core/utils/api-errors';

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
  readonly #authService = inject(AuthService);

  readonly #userService = inject(UserService);

  readonly #sessionData: WritableSignal<SessionData | undefined> = signal(undefined);

  readonly #isLoggedIn: Signal<boolean> = computed(() => this.#sessionData() !== undefined);

  constructor() {
    super();
  }

  public override async login(loginRequest: LoginRequest): Promise<boolean> {
    let sessionData: SessionData | undefined = undefined;

    const loginResponse: LoginResponse = await this.#authService.login(loginRequest);

    if (loginResponse.getCredentialsOk()) {
      sessionData = await this.#createSessionDataFromCurrentUser(loginResponse.getUserId()!);
    }

    this.#sessionData.set(sessionData);

    return sessionData !== undefined;
  }

  async #createSessionDataFromCurrentUser(userId: bigint): Promise<SessionData | undefined> {
    try {
      const user: User = await this.#userService.getUserById(userId);

      return new SessionDataBuilder()
        .setUserId(userId)
        .setUsername(user.getUsername())
        .setUserType(user.getUserType())
        .build();
    } catch (error: unknown) {
      // User might have been deleted right after authorization
      if (error instanceof ObjectNotFoundError) {
        return undefined;
      } else {
        throw error;
      }
    }
  }

  public override async logout(): Promise<void> {
    await this.#authService.logout();
    this.#sessionData.set(undefined);
  }

  public override async initSession(): Promise<void> {
    let sessionData: SessionData | undefined = undefined;

    const currentUser: CurrentUser = await this.#authService.getCurrentUser();
    const userId: bigint | undefined = currentUser.getUserId();
    if (userId !== undefined) {
      sessionData = await this.#createSessionDataFromCurrentUser(userId);
    }

    /*
     * There could still be a session cookie. We ignore this case though, because a logout
     * call has to happen in an active session or the backend throws an error.
     */

    this.#sessionData.set(sessionData);
  }

  public override getSessionData(): Signal<SessionData | undefined> {
    return this.#sessionData.asReadonly();
  }

  public override isLoggedIn(): Signal<boolean> {
    return this.#isLoggedIn;
  }
}
