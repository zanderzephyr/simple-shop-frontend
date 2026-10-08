import { isPlatformBrowser } from '@angular/common';
import {
	DestroyRef,
	DOCUMENT,
	effect,
	inject,
	Injectable,
	PLATFORM_ID,
	Signal,
	signal,
	WritableSignal
} from '@angular/core';
import { Theme } from '@core/theme/theme';
import { ThemeService } from '@core/theme/theme-service';
import { IllegalArgumentError } from '@core/utils/common-errors';
import { convertStringToEnum } from '@core/utils/data-type-utils';
import { Consumer } from '@core/utils/functional-interfaces';

const themeKey: string = 'theme';
const defaultTheme: Theme = Theme.LIGHT;

@Injectable({
	providedIn: 'root'
})
export class CoreThemeService extends ThemeService {
	readonly #document: Document = inject(DOCUMENT);
	readonly #platformId: Object = inject(PLATFORM_ID);
	readonly #destroyRef: DestroyRef = inject(DestroyRef);
	readonly #isBrowser: boolean = isPlatformBrowser(this.#platformId);

	readonly #activeTheme: WritableSignal<Theme> = signal(this.#determineInitialTheme());

	public constructor() {
		super();

		effect(() => {
			const currentTheme: Theme = this.#activeTheme();

			const colorSchemeValue: string = this.#mapThemeToNgMatColorSchemeValue(currentTheme);
			this.#document.documentElement.style.colorScheme = colorSchemeValue;

			if (this.#isBrowser) {
				localStorage.setItem(themeKey, currentTheme.id);
			}
		});

		this.#setUpStorageListener();
	}

	#setUpStorageListener(): void {
		if (!this.#isBrowser) {
			return;
		}

		const handleStorageChange: Consumer<StorageEvent> = (event: StorageEvent): void => {
			if (event.key === themeKey) {
				const theme: Theme = this.#parseTheme(event.newValue);
				this.#activeTheme.set(theme);
			}
		};

		window.addEventListener('storage', handleStorageChange);

		this.#destroyRef.onDestroy(() => window.removeEventListener('storage', handleStorageChange));
	}

	#mapThemeToNgMatColorSchemeValue(theme: Theme): string {
		let colorSchemeValue: string;

		if (Theme.DARK === theme) {
			colorSchemeValue = 'dark';
		} else if (Theme.LIGHT === theme) {
			colorSchemeValue = 'light';
		} else {
			throw new IllegalArgumentError('Unexpected theme value: ' + theme.id);
		}

		return colorSchemeValue;
	}

	#determineInitialTheme(): Theme {
		let themeString: string | null = null;
		if (this.#isBrowser) {
			themeString = localStorage.getItem(themeKey);

			if (themeString === null) {
				const prefersDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
				themeString = prefersDark ? Theme.DARK.id : Theme.LIGHT.id;
			}
		}

		return this.#parseTheme(themeString);
	}

	#parseTheme(themeString: string | null): Theme {
		if (themeString === null) {
			themeString = defaultTheme.id;
		}

		try {
			return convertStringToEnum(themeString, Theme)!;
		} catch (error: unknown) {
			// Catch manipulated localStorage cases
			return defaultTheme;
		}
	}

	public override getTheme(): Signal<Theme> {
		return this.#activeTheme.asReadonly();
	}

	public override setTheme(theme: Theme): void {
		this.#activeTheme.set(theme);
	}
}
