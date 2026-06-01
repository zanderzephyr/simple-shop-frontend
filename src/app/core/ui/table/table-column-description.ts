import { Type } from '@angular/core';

export class TableColumnDescription<TYPE> {
  readonly #modelIndex: number;

  readonly #title: string;

  readonly #type: string | Type<TYPE>;

  public constructor(modelIndex: number, title: string, type: string | Type<TYPE>) {
    this.#modelIndex = modelIndex;
    this.#title = title;
    this.#type = type;
  }

  public getModelIndex(): number {
    return this.#modelIndex;
  }

  public getTitle(): string {
    return this.#title;
  }

  public getType(): string | Type<TYPE> {
    return this.#type;
  }
}
