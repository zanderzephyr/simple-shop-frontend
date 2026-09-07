import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { LocalizationService } from '@core/localization/localization-service';
import { extractNumberValue } from '@core/utils/input-field-utils';
import * as Keys from './price-sidebar-filter-utils';

@Component({
	selector: 'app-price-sidebar-filter',
	imports: [MatSliderModule, MatFormFieldModule, MatInputModule],
	templateUrl: './price-sidebar-filter.html',
	styleUrl: './price-sidebar-filter.scss'
})
export class PriceSidebarFilterComponent {
	readonly #localizationService: LocalizationService = inject(LocalizationService);

	protected readonly filterTitleText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.TITLE_KEY));
	protected readonly maxValueLabelText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.MAX_VALUE_LABEL_KEY));
	protected readonly minValueLabelText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.MIN_VALUE_LABEL_KEY));

	// TODO This must be taken from the available items set later.
	protected readonly minLimit: number = 0;
	protected readonly maxLimit: number = 2000;

	protected readonly minPrice: WritableSignal<number> = signal<number>(20);
	protected readonly maxPrice: WritableSignal<number> = signal<number>(120);

	constructor() {
		// Nothing to do so far
	}

	protected updateMinPrice(event: Event): void {
		const numberValue: number | null = extractNumberValue(event);

		let newMinPrice: number;

		if (numberValue !== null) {
			if (numberValue < this.minLimit) {
				newMinPrice = this.minLimit;
			} else if (numberValue > this.maxPrice()) {
				newMinPrice = this.maxPrice();
			} else {
				newMinPrice = numberValue;
			}
		} else {
			newMinPrice = this.minLimit;
		}

		this.minPrice.set(newMinPrice);
	}

	protected updateMaxPrice(event: Event): void {
		const numberValue: number | null = extractNumberValue(event);

		let newMaxPrice: number;

		if (numberValue !== null) {
			if (numberValue < this.minPrice()) {
				newMaxPrice = this.minPrice();
			} else if (numberValue > this.maxLimit) {
				newMaxPrice = this.maxLimit;
			} else {
				newMaxPrice = numberValue;
			}
		} else {
			newMaxPrice = this.maxLimit;
		}

		this.maxPrice.set(newMaxPrice);
	}
}
