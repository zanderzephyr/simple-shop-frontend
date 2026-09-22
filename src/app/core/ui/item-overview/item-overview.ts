import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { ItemOverviewData } from '@ui/item-overview/item-overview-data';
import { ImageRendererComponent } from '@ui/renderer/image-renderer/image-renderer';
import { ImageRendererConfiguration } from '@ui/renderer/image-renderer/image-renderer-configuration';

// Uses strings for the prices, so that we always have exactly two digits after the decimal separator. Number type would
// reduce 5.00 to 5.
@Component({
	selector: 'app-item-overview',
	imports: [ImageRendererComponent],
	templateUrl: './item-overview.html',
	styleUrl: './item-overview.scss'
})
export class ItemOverviewComponent {
	public readonly data: InputSignal<ItemOverviewData> = input.required<ItemOverviewData>();
	protected readonly urlImageRendererConfiguration: Signal<ImageRendererConfiguration> = computed(() => new ImageRendererConfiguration(this.data().getItem().getImageUrl()));

	protected readonly price: Signal<string> = computed(() => {
		const price: number = this.data().getItem().getPrice();
		return (price / 100).toFixed(2);
	});

	protected readonly discountedPrice: Signal<string | undefined> = computed(() => {
		const discount: number | undefined = this.data().getDiscount();
		if (discount !== undefined) {
			const price: number = this.data().getItem().getPrice();
			return (price * (1 - discount) / 100).toFixed(2);
		}
		return undefined;
	});

	protected readonly discountInPercent: Signal<number | undefined> = computed(() => {
		const discount: number | undefined = this.data().getDiscount();
		if (discount !== undefined) {
			return discount * 100;
		}
		return undefined;
	});

	public constructor() {
		// Nothing to do so far
	}
}
