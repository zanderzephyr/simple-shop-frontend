import { Component, signal, WritableSignal } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'price-sidebar-filter',
  imports: [MatSliderModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './price-sidebar-filter.html',
  styleUrl: './price-sidebar-filter.css',
})
export class PriceSidebarFilter {
  // TODO This must be taken from the available items set later.
  protected readonly minLimit: number = 0;
  protected readonly maxLimit: number = 2000;

  protected minPrice: WritableSignal<number> = signal<number>(20);
  protected maxPrice: WritableSignal<number> = signal<number>(120);

  constructor() {}

  protected updateMinPrice(event: Event): void {
    const numberValue: number | null = this.#extractNumberValue(event);

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
    const numberValue: number | null = this.#extractNumberValue(event);

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

  #extractNumberValue(event: Event): number | null {
    if (!event || !event.target || !(event.target instanceof HTMLInputElement)) {
      return null;
    }

    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const rawValue: string = inputElement.value;

    let numberValue: number | null = null;

    /*
			Number() returns NaN for non-numeric strings.
     	Number.isFinite() returns false for NaN, Infinity, and -Infinity, and true for all other numbers.
		 	(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)
		 */
    if (rawValue && Number.isFinite(Number(rawValue))) {
      numberValue = Number(rawValue);
    }

    return numberValue;
  }
}
