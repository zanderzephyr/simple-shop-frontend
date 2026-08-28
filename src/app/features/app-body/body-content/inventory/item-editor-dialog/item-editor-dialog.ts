import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Item, ItemBuilder } from '@api/item/model/item';
import { compareMediaTypes, MediaType } from '@api/item/model/media-type';
import { LocalizationService } from '@core/localization/localization-service';
import { JAVA_MAX_INT_VALUE } from '@core/utils/data-type-utils';
import { GeneralDialogContentComponent } from '@ui/dialog/general-dialog/general-dialog-content';
import { ItemEditorDialogData } from './item-editor-dialog-data';
import * as Keys from './item-editor-dialog-utils';

interface ItemShape {
	title: string | null;
	mediaType: MediaType | null;
	stock: number | null;
	price: number | null;
	imageUrl: string | null;
}

@Component({
	selector: 'app-item-editor-dialog',
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
	templateUrl: './item-editor-dialog.html',
	styleUrl: './item-editor-dialog.scss'
})
export class ItemEditorDialogComponent extends GeneralDialogContentComponent<
	ItemEditorDialogData,
	Item
> {
	readonly #localizationService: LocalizationService = inject(LocalizationService);
	protected readonly imageUrlText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.IMAGE_URL_KEY));
	protected readonly imageUrlErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.IMAGE_URL_ERROR_KEY));
	protected readonly mediaTypeText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.MEDIA_TYPE_KEY));
	protected readonly mediaTypeErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.MEDIA_TYPE_ERROR_KEY));
	protected readonly priceText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.PRICE_KEY));
	protected readonly priceErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.PRICE_ERROR_KEY));
	protected readonly stockText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.TITLE_KEY));
	protected readonly stockErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.TITLE_ERROR_KEY));
	protected readonly titleText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.STOCK_KEY));
	protected readonly titleErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.STOCK_ERROR_KEY));


	protected readonly mediaTypes: Signal<readonly MediaType[]> = signal(
		Object.freeze(Object.values(MediaType))
	).asReadonly();

	readonly #formBuilder: FormBuilder = inject(FormBuilder);

	readonly #initialItem: Item | undefined = this.getDialogData().getItem();

	protected readonly itemForm = this.#formBuilder.group({
		title: [
			this.#initialItem?.getTitle() ?? null,
			[Validators.required, Validators.maxLength(400)]
		],
		mediaType: [this.#initialItem?.getMediaType() ?? null, [Validators.required]],
		stock: [
			this.#initialItem?.getStock() ?? null,
			[Validators.required, Validators.min(0), Validators.max(JAVA_MAX_INT_VALUE)]
		],
		price: [
			this.#initialItem?.getPrice() ?? null,
			[Validators.required, Validators.min(0), Validators.max(JAVA_MAX_INT_VALUE)]
		],
		imageUrl: [
			this.#initialItem?.getImageUrl() ?? null,
			[Validators.required, Validators.maxLength(2048)]
		]
	});

	protected readonly isSubmitted: WritableSignal<boolean> = signal(false);

	protected readonly compareMediaTypes: (o1: MediaType | null, o2: MediaType | null) => boolean =
		compareMediaTypes;

	constructor() {
		super();
	}

	// TODO Not called currently. Add a button for that or remove this method.
	protected discard(formDirective: FormGroupDirective): void {
		this.isSubmitted.set(false);
		formDirective.resetForm({
			title: this.#initialItem?.getTitle() ?? null,
			mediaType: this.#initialItem?.getMediaType() ?? null,
			stock: this.#initialItem?.getStock() ?? null,
			price: this.#initialItem?.getPrice() ?? null,
			imageUrl: this.#initialItem?.getImageUrl() ?? null
		});
	}

	protected override onConfirm(): void {
		this.isSubmitted.set(true);

		this.itemForm.markAllAsTouched();

		if (this.itemForm.valid) {
			const itemShape: ItemShape = this.itemForm.getRawValue();
			this.setResult(this.#createItem(itemShape));
			super.onConfirm();
		}
	}

	#createItem(itemShape: ItemShape): Item {
		const itemBuilder: ItemBuilder = new ItemBuilder() //
			.setTitle(itemShape.title!.trim()) //
			.setMediaType(itemShape.mediaType!) //
			.setStock(itemShape.stock!) //
			.setPrice(itemShape.price!) //
			.setImageUrl(itemShape.imageUrl!.trim());

		if (this.#initialItem) {
			itemBuilder.setId(this.#initialItem.getId()!);
			itemBuilder.setVersion(this.#initialItem.getVersion()!);
		}

		return itemBuilder.build();
	}

	protected override onCancel(): void {
		this.setResult(undefined);

		super.onCancel();
	}
}
