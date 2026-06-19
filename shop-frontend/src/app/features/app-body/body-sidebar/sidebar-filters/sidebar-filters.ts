import {
  Component,
  computed,
  Signal,
  inject,
  output,
  OutputEmitterRef,
  effect,
} from '@angular/core';
import { MediaTypeSidebarFilterComponent } from './media-type-sidebar-filter/media-type-sidebar-filter';
import { PriceSidebarFilterComponent } from './price-sidebar-filter/price-sidebar-filter';
import { ItemSearchResults } from '@core/item-search-results';

@Component({
  selector: 'app-sidebar-filters',
  imports: [MediaTypeSidebarFilterComponent, PriceSidebarFilterComponent],
  templateUrl: './sidebar-filters.html',
  styleUrl: './sidebar-filters.css',
})
export class SidebarFiltersComponent {
  /*
	 This is the Angular way of implementing an obversable pattern.
	 We define an output emitter here, that emits booleans. A signal
	 represents a state, an output represents an event. Parent
	 components can register to this event by doing
	 <app-sidebar-filters (visibilityChange)="parentMethod($event)"></app-sidebar-filters>.
	 The complete memory management of the event emitter is handled by Angular,
	 so we don't have to worry about unsubscribing or memory leaks.
	*/
  public readonly visibilityChange: OutputEmitterRef<boolean> = output<boolean>();

  readonly #itemSearchResults: ItemSearchResults = inject(ItemSearchResults);

  readonly #isVisible: Signal<boolean> = computed(
    () => this.#itemSearchResults.getSearchResults()().length > 0,
  );

  constructor() {
    effect(() => {
      this.visibilityChange.emit(this.#isVisible());
    });
  }
}
