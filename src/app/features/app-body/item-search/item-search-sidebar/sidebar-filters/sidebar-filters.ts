import { Component, computed, effect, inject, output, OutputEmitterRef, Signal } from '@angular/core';
import { ItemSearchResults } from '@core/item-search-results';
import { LocalizationService } from '@core/localization/localization-service';
import { MediaTypeSidebarFilterComponent } from './media-type-sidebar-filter/media-type-sidebar-filter';
import { PriceSidebarFilterComponent } from './price-sidebar-filter/price-sidebar-filter';
import * as Keys from './sidebar-filters-utils';

@Component({
	selector: 'app-sidebar-filters',
	imports: [MediaTypeSidebarFilterComponent, PriceSidebarFilterComponent],
	templateUrl: './sidebar-filters.html',
	styleUrl: './sidebar-filters.scss'
})
export class SidebarFiltersComponent {
	readonly #localizationService: LocalizationService = inject(LocalizationService);

	protected readonly filtersTitleText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.FILTERS_TITLE_KEY));

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
		() => this.#itemSearchResults.getSearchResults()().length > 0
	);

	public constructor() {
		effect(() => {
			this.visibilityChange.emit(this.#isVisible());
		});
	}
}
