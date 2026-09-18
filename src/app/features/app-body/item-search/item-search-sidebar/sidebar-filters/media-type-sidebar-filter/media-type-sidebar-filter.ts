import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MediaType } from '@api/item/model/media-type';
import { LocalizationService } from '@core/localization/localization-service';
import { LocalizedObject } from '@core/utils/localization-utils';
import * as Keys from './media-type-sidebar-filter-utils';

@Component({
	selector: 'app-media-type-sidebar-filter',
	imports: [MatSelectModule, MatFormFieldModule],
	templateUrl: './media-type-sidebar-filter.html',
	styleUrl: './media-type-sidebar-filter.scss'
})
export class MediaTypeSidebarFilterComponent {
	readonly #localizationService: LocalizationService = inject(LocalizationService);
	protected readonly filterTitleText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.TITLE_KEY));
	protected readonly chooseMediaTypeLabelText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.CHOOSE_MEDIA_TYPE_LABEL_KEY));
	protected readonly allTypesLabelText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.ALL_TYPES_LABEL_KEY));

	readonly #allMediaTypeValue: string = 'All';

	protected readonly localizedMediaTypes: Signal<readonly LocalizedObject<MediaType>[]> = computed(
		() => {
			const mediaTypes: MediaType[] = Object.values(MediaType);
			const options: LocalizedObject<MediaType>[] = mediaTypes.map((t) => {
				const mediaTypeKey: string = Keys.MEDIA_TYPE_ENUM_KEY + t.id.toLowerCase();
				const label: string = this.#localizationService.getValue(mediaTypeKey);
				return { object: t, localizedLabel: label };
			});
			return Object.freeze(options);
		}
	);

	protected readonly selectedMediaType: WritableSignal<string> = signal<string>(
		this.#allMediaTypeValue
	);

	constructor() {
		// Nothing to do so far
	}

	protected updateSelectedMediaType(mediaType: string): void {
		this.selectedMediaType.set(mediaType);
	}

	protected getAllMediaTypesValue(): string {
		return this.#allMediaTypeValue;
	}
}
