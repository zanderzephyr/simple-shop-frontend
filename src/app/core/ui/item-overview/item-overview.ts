import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { ItemOverviewData } from '@ui/item-overview/item-overview-data';
import { ImageRendererComponent } from '@ui/renderer/image-renderer/image-renderer';
import { ImageRendererConfiguration } from '@ui/renderer/image-renderer/image-renderer-configuration';

@Component({
	selector: 'app-item-overview',
	imports: [ImageRendererComponent],
	templateUrl: './item-overview.html',
	styleUrl: './item-overview.scss'
})
export class ItemOverviewComponent {
	public readonly data: InputSignal<ItemOverviewData> = input.required<ItemOverviewData>();
	protected readonly urlImageRendererConfiguration: Signal<ImageRendererConfiguration> = computed(() => new ImageRendererConfiguration(this.data().getItem().getImageUrl()));
	protected readonly math: Math = Math;

	public constructor() {
		// Nothing to do so far
	}
}
