export class User {
  readonly #id: number;
  readonly #username: string;
  readonly #userType: UserType;

  constructor(userData: UserData) {
    this.#id = userData.id;
    this.#username = userData.username;
    this.#userType = userData.userType;
  }

  public getId(): number {
    return this.#id;
  }

  public getUsername(): string {
    return this.#username;
  }

  public getUserType(): UserType {
    return this.#userType;
  }
}

export class UserBuilder {
  #id?: number;
  #username?: string;
  #userType?: UserType;

  constructor() {
    // Nothing to do so far
  }

  public getId(): number | undefined {
    return this.#id;
  }

  public setId(id: number): this {
    this.#id = id;
    return this;
  }

  public getUsername(): string | undefined {
    return this.#username;
  }

  public setUsername(username: string): this {
    this.#username = username;
    return this;
  }

  public getUserType(): UserType | undefined {
    return this.#userType;
  }

  public setUserType(userType: UserType): this {
    this.#userType = userType;
    return this;
  }

  public getUserData(): UserData {
    this.#validate();

    return {
      // ! tells the compiler, these values can't be null or undefined.
      id: this.#id!,
      username: this.#username!,
      userType: this.#userType!,
    };
  }

  #validate(): void {
    if (this.#id === undefined) {
      throw new Error('No item ID!');
    }

    if (this.#username === undefined) {
      throw new Error('No item username!');
    }

    if (this.#userType === undefined) {
      throw new Error('No item userType!');
    }
  }

  public build(): User {
    return new User(this.getUserData());
  }
}

interface UserData {
  id: number;
  username: string;
  userType: UserType;
}

export const UserType: {
  readonly Admin: { readonly id: 'admin'; readonly name: 'Admin' };
  readonly Customer: { readonly id: 'customer'; readonly name: 'Customer' };
} = {
  Admin: { id: 'admin', name: 'Admin' },
  Customer: { id: 'customer', name: 'Customer' },
} as const;
type ValueOf<T> = T[keyof T];
export type UserType = ValueOf<typeof UserType>;
