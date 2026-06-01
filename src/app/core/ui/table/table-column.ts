import { Type, WritableSignal } from '@angular/core';

/*
	TODO Add a persistence source, from which user specific configurations like
	column ordering, hidden state, specific and so on can be requested. That
	source should be on server side, to prevent it from being lost on client resets.

	TODO Renderer and editor on basis of the formatter I assume

	TODO Add viewIndex I assume
*/
export interface TableColumn<TYPE> {
  getModelIndex(): number;

  getType(): Type<TYPE> | string;

  getHidden(): WritableSignal<boolean>;

  getTitle(): WritableSignal<string>;
}
