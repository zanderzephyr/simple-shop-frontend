export class SessionData {
  readonly #userId: bigint;

  constructor(userId: bigint) {
    this.#userId = userId;
  }

  public getUserId(): bigint {
    return this.#userId;
  }
}
