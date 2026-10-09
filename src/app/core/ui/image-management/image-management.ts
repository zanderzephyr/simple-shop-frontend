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
import { ImageManagementConfig } from '@ui/image-management/image-management-config';

// TODO Let this component be a general resource management component, so that it can deal with all kinds of data types?
@Component({
	selector: 'app-image-management',
	imports: [MatIconModule, NgOptimizedImage],
	templateUrl: './image-management.html',
	styleUrl: './image-management.scss'
})
export class ImageManagementComponent {
	readonly #platformId: Object = inject(PLATFORM_ID);

	public readonly imageManagementConfig: InputSignal<ImageManagementConfig> = input.required();

	public readonly imageStorageKey: InputSignal<string | undefined> = input<string | undefined>(undefined);
	readonly #modifiableImageStorageKey: WritableSignal<string | undefined> = signal(undefined);
	protected readonly imageUrl: Signal<string | undefined> = computed(() => {
		const imageStorageKey: string | undefined = this.imageStorageKey();
		const modifiableImageStorageKey: string | undefined = this.#modifiableImageStorageKey();
		const storageKeyToUse: string | undefined = modifiableImageStorageKey !== undefined ? modifiableImageStorageKey : imageStorageKey;
		if (storageKeyToUse !== undefined) {
			return this.imageManagementConfig().createDownloadUrl(storageKeyToUse);
		}
		return undefined;
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
			this.#modifiableImageStorageKey.set(storageKey);
		}
	}

	protected async onDeleteImage(): Promise<void> {
		const imageStorageKey: string | undefined = this.#modifiableImageStorageKey();
		if (imageStorageKey !== undefined) {
			await this.imageManagementConfig().removeImage(imageStorageKey);
			this.#modifiableImageStorageKey.set(undefined);
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
