export class LoginCredentials {
  readonly #username: string;
  readonly #password: string;

  constructor(username: string, password: string) {
    this.#username = username;
    this.#password = password;

    Object.freeze(this);
  }

  public getUsername(): string {
    return this.#username;
  }

  public getPassword(): string {
    return this.#password;
  }
}
