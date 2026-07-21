import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { UserType } from '@api/user/model/user-type';

let INSTANCE: Session | null = null;

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    if (!INSTANCE) {
      INSTANCE = new Session();
    }
    return INSTANCE;
  },
})
export class Session {
  readonly #sessionData: WritableSignal<SessionData | undefined> = signal(undefined);

  readonly #isLoggedIn: Signal<boolean> = computed(() => this.#sessionData() !== undefined);

  constructor() {
    if (INSTANCE) {
      throw new Error(
        'Instantiation failed: ' +
          Session.name +
          ' is a singleton managed by the framework. Manual creation or re-providing is forbidden.',
      );
    }
  }

  /**
   * Only to be called by the session service.
   */
  public logIn(sessionData: SessionData): void {
    this.#sessionData.set(sessionData);
  }

  /**
   * Only to be called by the session service.
   */
  public logOut(): void {
    this.#sessionData.set(undefined);
  }

  public getSessionData(): Signal<SessionData | undefined> {
    return this.#sessionData.asReadonly();
  }

  public isLoggedIn(): Signal<boolean> {
    return this.#isLoggedIn;
  }
}

export class SessionData {
  readonly #username: string;

  readonly #userType: UserType;

  constructor(username: string, userType: UserType) {
    this.#username = username;
    this.#userType = userType;
  }

  public getUsername(): string {
    return this.#username;
  }

  public getUserType(): UserType {
    return this.#userType;
  }
}
