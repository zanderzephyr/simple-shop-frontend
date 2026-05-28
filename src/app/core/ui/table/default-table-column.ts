import { WritableSignal, signal } from '@angular/core';
import { TableColumnDescription } from './table-column-description';
import { TableColumn } from '@core/ui/table/table-column';
import { Formatter } from '@core/utils/formatter';

/*
	TODO Add a persistence source, from which user specific configurations like
	column ordering, hidden state, specific and so on can be requested. That
	source should be on server side, to prevent it from being lost on client resets.
*/
export class DefaultTableColumn<TYPE> implements TableColumn<TYPE> {
  readonly #title: WritableSignal<string>;
  readonly #hidden: WritableSignal<boolean>;
  readonly #modelIndex: number;
  readonly #formatter: Formatter<TYPE>;

  // TODO Renderer and editor on basis of the formatter I assume

  public constructor(columnDescription: TableColumnDescription<TYPE>) {
    this.#modelIndex = columnDescription.getModelIndex();
    this.#title = signal(columnDescription.getTitle());
    this.#formatter = columnDescription.getFormatter();
    this.#hidden = signal(false);
  }

  public getModelIndex(): number {
    return this.#modelIndex;
  }

  getFormatter(): Formatter<TYPE> {
    return this.#formatter;
  }

  getHidden(): WritableSignal<boolean> {
    return this.#hidden;
  }

  getTitle(): WritableSignal<string> {
    return this.#title;
  }
}
