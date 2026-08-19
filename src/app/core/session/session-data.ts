import { UserType } from '@api/user/model/user-type';
import { IllegalStateError } from '@core/utils/common-errors';
import { isBlank } from '@core/utils/string-utils';

const secretKey: symbol = Symbol('secretKey');

interface SessionDataData {
  [secretKey]: true; // Marker to prevent external construction
  userId: bigint;
  username: string;
  userType: UserType;
}

export class SessionData {
  readonly #userId: bigint;
  readonly #username: string;
  readonly #userType: UserType;

  constructor(sessionDataData: SessionDataData) {
    this.#userId = sessionDataData.userId;
    this.#username = sessionDataData.username;
    this.#userType = sessionDataData.userType;

    Object.freeze(this);
  }

  public getUserId(): bigint {
    return this.#userId;
  }

  public getUsername(): string {
    return this.#username;
  }

  public getUserType(): UserType {
    return this.#userType;
  }
}

export class SessionDataBuilder {
  #userId?: bigint;
  #username?: string;
  #userType?: UserType;

  constructor() {
    // Nothing to do so far
  }

  public getUserId(): bigint | undefined {
    return this.#userId;
  }

  public setUserId(userId: bigint | undefined): SessionDataBuilder {
    this.#userId = userId;
    return this;
  }

  public getUsername(): string | undefined {
    return this.#username;
  }

  public setUsername(username: string | undefined): SessionDataBuilder {
    this.#username = username;
    return this;
  }

  public getUserType(): UserType | undefined {
    return this.#userType;
  }

  public setUserType(userType: UserType | undefined): SessionDataBuilder {
    this.#userType = userType;
    return this;
  }

  #createSessionDataData(): SessionDataData {
    this.#validate();

    // Existence of fields relies on the validation above.
    return {
      [secretKey]: true,
      userId: this.#userId!,
      username: this.#username!,
      userType: this.#userType!,
    };
  }

  #validate(): void {
    if (this.#userId === undefined || this.#userId < 0n) {
      throw new IllegalStateError('Invalid user ID!');
    }

    if (this.#username === undefined || isBlank(this.#username)) {
      throw new IllegalStateError('Invalid username!');
    }

    if (this.#userType === undefined) {
      throw new IllegalStateError('Invalid user type!');
    }
  }

  public build(): SessionData {
    return new SessionData(this.#createSessionDataData());
  }
}
