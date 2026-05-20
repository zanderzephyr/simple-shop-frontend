import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Item } from '@app/core/api/item/model/item';

let INSTANCE: ItemSearchResults | null = null;

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    if (!INSTANCE) {
      INSTANCE = new ItemSearchResults();
    }
    return INSTANCE;
  },
})
export class ItemSearchResults {
  readonly #itemSearchResults: WritableSignal<readonly Item[]> = signal([]);

  readonly #itemSearchResultPublic: Signal<readonly Item[]> = this.#itemSearchResults.asReadonly();

  /*
	 	We can't use a strict private constructor in JS and we can't use
		a regular private constructor due to the useFactory property above.
	 */
  constructor() {
    if (INSTANCE) {
      throw new Error(
        'Instantiation failed: ' +
          ItemSearchResults.name +
          ' is a singleton managed by the framework. Manual creation or re-providing is forbidden.',
      );
    }
  }

  public addSearchResults(items: readonly Item[]): void {
    const copy: readonly Item[] = Object.freeze([...items]);
    this.#itemSearchResults.set(copy);
  }

  public clearSearchResults(): void {
    this.#itemSearchResults.set(Object.freeze([]));
  }

  public getSearchResults(): Signal<readonly Item[]> {
    return this.#itemSearchResultPublic;
  }
}
