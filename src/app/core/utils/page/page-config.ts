export class PageConfig {
  readonly #pageIndex: number;

  readonly #pageSize: number;

  public constructor(pageIndex: number, pageSize: number) {
    this.#pageIndex = pageIndex;
    this.#pageSize = pageSize;
  }

  public getPageIndex(): number {
    return this.#pageIndex;
  }

  public getPageSize(): number {
    return this.#pageSize;
  }
}
