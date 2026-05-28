import { Formatter } from '@app/core/utils/formatter';

export class TableColumnDescription<TYPE> {
  readonly #modelIndex: number;

  readonly #title: string;

  readonly #formatter: Formatter<TYPE>;

  public constructor(modelIndex: number, title: string, formatter: Formatter<TYPE>) {
    this.#modelIndex = modelIndex;
    this.#title = title;
    this.#formatter = formatter;
  }

  public getModelIndex(): number {
    return this.#modelIndex;
  }

  public getTitle(): string {
    return this.#title;
  }

  public getFormatter(): Formatter<TYPE> {
    return this.#formatter;
  }
}
