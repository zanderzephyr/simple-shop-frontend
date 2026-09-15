import { Component, input, InputSignal } from '@angular/core';
import { ItemOverviewData } from '@ui/item-overview/item-overview-data';

@Component({
	selector: 'app-item-overview',
	imports: [],
	templateUrl: './item-overview.html',
	styleUrl: './item-overview.scss'
})
export class ItemOverviewComponent {
	public readonly data: InputSignal<ItemOverviewData> = input.required<ItemOverviewData>();

	public constructor() {
		// Nothing to do so far
	}
}
