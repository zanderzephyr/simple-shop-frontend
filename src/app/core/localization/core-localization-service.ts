import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
	computed,
	DestroyRef,
	effect,
	inject,
	Injectable,
	PLATFORM_ID,
	Signal,
	signal,
	WritableSignal
} from '@angular/core';
import { Localization } from '@core/localization/localization';
import { LocalizationService } from '@core/localization/localization-service';
import { MISSING_PLACEHOLDER_KEY } from '@core/localization/localization-utils';
import { convertStringToEnum } from '@core/utils/data-type-utils';
import { Consumer } from '@core/utils/functional-interfaces';
import { KEY_SEPARATOR } from '@core/utils/localization-utils';
import { firstValueFrom } from 'rxjs';

const localizationKey: string = 'localization';
const defaultLocalization: Localization = Localization.ENGLISH;

@Injectable({
	providedIn: 'root'
})
export class CoreLocalizationService extends LocalizationService {
	readonly #platformId: Object = inject(PLATFORM_ID);
	readonly #destroyRef: DestroyRef = inject(DestroyRef);
	readonly #http: HttpClient = inject(HttpClient);
	readonly #isBrowser: boolean = isPlatformBrowser(this.#platformId);

	readonly #activeLocalization: WritableSignal<Localization> = signal(this.#determineInitialLocalization());

	readonly #localizationMapping: WritableSignal<unknown | undefined> = signal(undefined);

	readonly #isInitialized: Signal<boolean> = computed(
		() => this.#localizationMapping() !== undefined
	);

	#requestId: bigint = 0n;

	public constructor() {
		super();

		effect(() => {
			const currentLocalization: Localization = this.#activeLocalization();
			const currentRequestId: bigint = ++this.#requestId;

			firstValueFrom(
				this.#http.get('localization/' + currentLocalization.id.toLowerCase() + '.json')
			).then(
				(file) => {
					// Prevents an old change to overwrite a newer one (important for fast changes)
					if (this.#requestId === currentRequestId) {
						this.#localizationMapping.set(file);
					}
				},
				(reason) => console.error('Failed to load localization resource: ' + reason)
			);

			if (this.#isBrowser) {
				localStorage.setItem(localizationKey, currentLocalization.id);
			}
		});

		this.#setUpStorageListener();
	}

	#setUpStorageListener(): void {
		if (!this.#isBrowser) {
			return;
		}

		const handleStorageChange: Consumer<StorageEvent> = (event: StorageEvent): void => {
			if (event.key === localizationKey) {
				const localization: Localization = this.#parseLocalization(event.newValue);
				this.#activeLocalization.set(localization);
			}
		};

		window.addEventListener('storage', handleStorageChange);

		this.#destroyRef.onDestroy(() => window.removeEventListener('storage', handleStorageChange));
	}

	#determineInitialLocalization(): Localization {
		let localizationString: string | null = null;
		if (this.#isBrowser) {
			localizationString = localStorage.getItem(localizationKey);

			if (localizationString === null) {
				// TODO Switch to OS language if possible
			}
		}

		return this.#parseLocalization(localizationString);
	}

	#parseLocalization(localizationString: string | null): Localization {
		if (localizationString === null) {
			localizationString = defaultLocalization.id;
		}

		try {
			return convertStringToEnum(localizationString, Localization)!;
		} catch (error: unknown) {
			// Catch manipulated localStorage cases
			return defaultLocalization;
		}
	}

	public override getValue(key: string): string {
		// Called as first step to make sure, terminal signals register the localization signal.
		const localization: unknown | undefined = this.#localizationMapping();

		// Return gentle place holder until the localization is initialized.
		if (localization === undefined) {
			return '';
		}

		let mappedValue: unknown | undefined = this.#splitKeyAndRetrieveValue(key, localization);
		if (typeof mappedValue !== 'string') {
			mappedValue = this.#splitKeyAndRetrieveValue(MISSING_PLACEHOLDER_KEY, localization);
		}
		if (typeof mappedValue !== 'string') {
			mappedValue = 'No localization value available for ' + key + '!';
			console.error(mappedValue);
		}

		const postProcessedValue: string = (mappedValue as string).replace('{key}', key);

		return postProcessedValue;
	}

	#splitKeyAndRetrieveValue(key: string, localization: unknown): unknown | undefined {
		let mappedValue: unknown | undefined;

		try {
			mappedValue = key
				.split(KEY_SEPARATOR)
				.reduce(
					(previousValue, currentValue) => previousValue?.[currentValue],
					localization as any
				);
		} catch {
			mappedValue = undefined;
		}

		return mappedValue;
	}

	public override getLocalization(): Signal<Localization> {
		return this.#activeLocalization.asReadonly();
	}

	public override setLocalization(localization: Localization): void {
		this.#activeLocalization.set(localization);
	}

	public override isInitialized(): Signal<boolean> {
		return this.#isInitialized;
	}
}
