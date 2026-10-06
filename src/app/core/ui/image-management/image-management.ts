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
import { Function, Supplier } from '@core/utils/functional-interfaces';

// TODO Let this component be a general resource management component, so that it can deal with all kinds of data types?
@Component({
	selector: 'app-image-management',
	imports: [MatIconModule, NgOptimizedImage],
	templateUrl: './image-management.html',
	styleUrl: './image-management.scss'
})
export class ImageManagementComponent {
	readonly #platformId: Object = inject(PLATFORM_ID);

	public readonly allowedFileTypes: InputSignal<string[]> = input.required();

	public readonly imageUploader: InputSignal<Function<File, Promise<string>>> = input.required();
	public readonly imageRemover: InputSignal<Supplier<Promise<void>>> = input.required();
	public readonly maxWidth: InputSignal<number> = input.required();
	public readonly maxHeight: InputSignal<number> = input.required();
	// TODO Adapt from string input parameter to some container that holds all necessary aspects (width, height, image
	// format)
	public readonly imageUrlPreprocessor: InputSignal<Function<string, string>> = input.required();

	public readonly imageUrl: InputSignal<string | undefined> = input<string | undefined>(undefined);
	readonly #modifiableImageUrl: WritableSignal<string | undefined> = signal(undefined);
	protected readonly imageUrlToDisplay: Signal<string | undefined> = computed(() => {
		const imageUrl: string | undefined = this.imageUrl();
		const imageUrlToModify: string | undefined = this.#modifiableImageUrl();
		const urlToUse: string | undefined = imageUrlToModify === undefined ? imageUrl : imageUrlToModify;
		if (urlToUse !== undefined) {
			return this.imageUrlPreprocessor()(urlToUse);
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

			hiddenInput.accept = this.allowedFileTypes()
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
			const newImageUrl: string = await this.imageUploader()(file);
			this.#modifiableImageUrl.set(newImageUrl);
		}
	}

	protected async onDeleteImage(): Promise<void> {
		await this.imageRemover()();
		this.#modifiableImageUrl.set(undefined);
	}

	protected async onModifyImage(): Promise<void> {
		const file: File | undefined = await this.#pickFile();

		if (file !== undefined) {
			await this.onDeleteImage();
			await this.#doSetImage(file);
		}
	}
}
