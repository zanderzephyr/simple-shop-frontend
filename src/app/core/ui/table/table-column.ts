import { WritableSignal } from '@angular/core';
import { Formatter } from '@core/utils/formatter';

/*
	TODO Add a persistence source, from which user specific configurations like
	column ordering, hidden state, specific and so on can be requested. That
	source should be on server side, to prevent it from being lost on client resets.

	TODO Renderer and editor on basis of the formatter I assume

	TODO Add viewIndex I assume
*/
export interface TableColumn<TYPE> {
  getModelIndex(): number;

  getFormatter(): Formatter<TYPE>;

  getHidden(): WritableSignal<boolean>;

  getTitle(): WritableSignal<string>;
}
