import { computed, effect, inject, Injectable, Signal } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { LocalizationService } from '@core/localization/localization-service';
import * as Keys from './paginator-utils';

@Injectable()
export class NgMatPaginatorLocalizationService extends MatPaginatorIntl {
	readonly #localizationService: LocalizationService = inject(LocalizationService);

	readonly #itemsPerPageText: Signal<string> = computed(() =>
		this.#localizationService.getValue(Keys.ITEMS_PER_PAGE_KEY)
	);

	readonly #ofText: Signal<string> = computed(() =>
		this.#localizationService.getValue(Keys.OF_KEY)
	);

	readonly #pageText: Signal<string> = computed(() =>
		this.#localizationService.getValue(Keys.PAGE_KEY)
	);

	public constructor() {
		super();

		effect(() => {
			this.itemsPerPageLabel = this.#itemsPerPageText();
		});
	}

	/**
	 * @param currentPageIndex 0-based index of the current page
	 * @param generalPageSize Configured length of a page of the paginator
	 * @param completeListLength Length of the whole paginated list
	 */
	override getRangeLabel = (currentPageIndex: number, generalPageSize: number, completeListLength: number): string => {
		// Signal registration
		const pageText: string = this.#pageText();
		const ofText: string = this.#ofText();

		const maxPageNumber: number = Math.max(1, Math.ceil(completeListLength / generalPageSize));
		const currentPageNumber: number = currentPageIndex + 1;

		return pageText + ' ' + currentPageNumber + ' ' + ofText + ' ' + maxPageNumber;
	};
}
