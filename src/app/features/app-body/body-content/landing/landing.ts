import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ItemService } from '@api/item/item-service';
import { Item } from '@api/item/model/item';
import { LocalizationService } from '@core/localization/localization-service';
import { PageConfig } from '@core/utils/page/page-config';
import { drawRandomSublist } from '@core/utils/random-utils';
import { ItemOverviewComponent } from '@features/app-body/body-content/item-overview/item-overview';
import {
	ItemOverviewData,
	ItemOverviewDataBuilder
} from '@features/app-body/body-content/item-overview/item-overview-data';
import * as LocalizationKeys from './landing-utils';

@Component({
	selector: 'app-landing',
	imports: [ItemOverviewComponent],
	templateUrl: './landing.html',
	styleUrl: './landing.scss'
})
export class LandingComponent {
	readonly #localizationService: LocalizationService = inject(LocalizationService);
	protected readonly specialDiscountsTitleText: Signal<string> = computed(() => this.#localizationService.getValue(LocalizationKeys.SPECIAL_DISCOUNTS_TITLE_KEY));

	readonly #itemService: ItemService = inject(ItemService);
	protected readonly specialItemDiscountData: WritableSignal<ItemOverviewData[]> = signal([]);

	protected readonly Math: Math = Math;

	public constructor() {
		this.#init();
	}

	#init(): void {
		this.#initSpecialDiscounts();
	}

	// TODO Replace with a persistent discount mechanism
	#initSpecialDiscounts(): void {
		const pageConfig: PageConfig = new PageConfig(0, 100);
		const possibleDiscounts: number[] = [0.5, 0.1, 0.15, 0.2, 0.25, 0.5];

		this.#itemService.getItems(pageConfig).then((page) => {
			const randomSublist: Item[] = drawRandomSublist(page.getContent(), 10);

			const itemOverviewDataList: ItemOverviewData[] = [];
			for (const item of randomSublist) {
				const itemOverviewData: ItemOverviewData = new ItemOverviewDataBuilder()//
					.setItem(item)//
					.setDiscount(drawRandomSublist(possibleDiscounts, 1)[0])//
					.build();
				itemOverviewDataList.push(itemOverviewData);
			}

			this.specialItemDiscountData.set(itemOverviewDataList);
		});
	}
}
