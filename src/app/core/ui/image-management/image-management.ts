import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import {
	Component,
	computed,
	inject,
	input,
	InputSignal,
	PLATFORM_ID,
	Signal,
	signal,
	WritableSignal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LocalizationService } from '@core/localization/localization-service';
import { ImageManagementConfig } from '@ui/image-management/image-management-config';
import * as Keys from './image-management-utils';

// TODO Let this component be a general resource management component, so that it can deal with all kinds of data types?
@Component({
	selector: 'app-image-management',
	imports: [MatIconModule, NgOptimizedImage, MatMenuModule],
	templateUrl: './image-management.html',
	styleUrl: './image-management.scss'
})
export class ImageManagementComponent {
	readonly #platformId: Object = inject(PLATFORM_ID);

	readonly #localizationService: LocalizationService = inject(LocalizationService);
	protected readonly deleteImageText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.DELETE_IMAGE_KEY));
	protected readonly modifyImageText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.MODIFY_IMAGE_KEY));
	protected readonly uploadImageText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.UPLOAD_IMAGE_KEY));

	public readonly imageManagementConfig: InputSignal<ImageManagementConfig> = input.required();

	// This input is only used initially. As soon as the user modifies the initial image, that new image is used.
	public readonly imageStorageKey: InputSignal<string | undefined> = input<string | undefined>(undefined);
	readonly #modifiableImageStorageKey: WritableSignal<string | undefined> = signal(undefined, { equal: () => false });
	#imageModified: boolean = false;
	readonly #effectiveStorageKey: Signal<string | undefined> = computed(() => {
		const imageStorageKey: string | undefined = this.imageStorageKey();
		const modifiableImageStorageKey: string | undefined = this.#modifiableImageStorageKey();
		return this.#imageModified ? modifiableImageStorageKey : imageStorageKey;
	});

	protected readonly imageUrl: Signal<string | undefined> = computed(() => {
		const storageKeyToUse: string | undefined = this.#effectiveStorageKey();
		return storageKeyToUse === undefined ? undefined : this.imageManagementConfig().createDownloadUrl(storageKeyToUse);
	});

	public constructor() {
		// Nothing to do so far
	}

	protected async onSetImage(): Promise<void> {
		const file: File | undefined = await this.#pickFile();
		return this.#doSetImage(file);
	}

	#pickFile(): Promise<File | undefined> {
		return new Promise<File | undefined>((resolve) => {
			if (!isPlatformBrowser(this.#platformId)) {
				resolve(undefined);
				return;
			}

			// Only creates an element, doesn't really add it to the document.
			const hiddenInput: HTMLInputElement = document.createElement('input');
			hiddenInput.type = 'file';

			hiddenInput.accept = this.imageManagementConfig().getAllowedFileTypes()
				.map(fileType => fileType.toLowerCase())
				.map(fileType => fileType === 'jpg' ? 'image/jpeg' : ('image/' + fileType))
				.join(',');

			hiddenInput.onchange = async (event: Event): Promise<void> => {
				const inputElement = event.target as HTMLInputElement;
				if (inputElement.files && inputElement.files.length > 0) {
					resolve(inputElement.files[0]);
				} else {
					resolve(undefined);
				}
			};

			hiddenInput.oncancel = (): void => {
				resolve(undefined);
			};

			hiddenInput.click();
		});
	}

	async #doSetImage(file: File | undefined): Promise<void> {
		if (file !== undefined) {
			const storageKey: string | undefined = await this.imageManagementConfig().uploadImage(file);
			if (storageKey !== undefined) {
				this.#imageModified = true;
				this.#modifiableImageStorageKey.set(storageKey);
			}
		}
	}

	protected async onDeleteImage(): Promise<void> {
		let storageKey: string | undefined = this.#effectiveStorageKey();

		// TODO Currently, we set the image as delete in the frontend first and then remove it in the backend to make
		// sure a delete image doesn't cause bad access issues. This might cause problems if the image managed by this
		// component has a context, that declares it illegal to have multiple pictures, because this component allows
		// the user to immediately upload another picture.
		if (storageKey !== undefined) {
			this.#imageModified = true;
			this.#modifiableImageStorageKey.set(undefined);
			await this.imageManagementConfig().removeImage(storageKey);
		}
	}

	protected async onModifyImage(): Promise<void> {
		const file: File | undefined = await this.#pickFile();

		if (file !== undefined) {
			await this.onDeleteImage();
			await this.#doSetImage(file);
		}
	}
}
