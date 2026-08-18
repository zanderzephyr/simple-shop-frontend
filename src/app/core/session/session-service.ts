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
import { DialogService, openErrorDialog } from '../ui/dialog/interface/dialog-service';
import { CurrentUser } from '../api/auth/model/current-user';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => CoreSessionService),
})
export abstract class SessionService {
  public constructor() {}

  public abstract login(loginRequest: LoginRequest): Promise<void>;

  public abstract logout(): Promise<void>;

  public abstract initSession(): Promise<void>;

  public abstract getSessionData(): Signal<SessionData | undefined>;

  public abstract isLoggedIn(): Signal<boolean>;
}

@Injectable()
class CoreSessionService extends SessionService {
  readonly #sessionData: WritableSignal<SessionData | undefined> = signal(undefined);

  readonly #isLoggedIn: Signal<boolean> = computed(() => this.#sessionData() !== undefined);

  readonly #authService = inject(AuthService);

  readonly #dialogService = inject(DialogService);

  constructor() {
    super();
  }

  public override async login(loginRequest: LoginRequest): Promise<void> {
    const loginResponse: LoginResponse = await this.#authService.login(loginRequest);

    if (loginResponse.getCredentialsOk()) {
      this.#sessionData.set(new SessionData(loginResponse.getUserId()!));
    } else {
      openErrorDialog(this.#dialogService, 'Login failed!');
    }
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
