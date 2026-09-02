import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
	DestroyRef,
	effect,
	forwardRef,
	inject,
	Injectable,
	PLATFORM_ID,
	signal,
	Signal,
	WritableSignal
} from '@angular/core';
import { IllegalArgumentError } from '@core/utils/common-errors';
import { convertStringToEnum } from '@core/utils/data-type-utils';
import { Consumer } from '@core/utils/functional-interfaces';
import { Theme } from './theme';

@Injectable({
	providedIn: 'root',
	useClass: forwardRef(() => CoreThemeService)
})
export abstract class ThemeService {
	protected constructor() {
		// Nothing to do so far
	}

	public abstract getTheme(): Signal<Theme>;

	public abstract setTheme(theme: Theme): void;
}

const themeKey: string = 'theme';
const defaultTheme: Theme = Theme.LIGHT;

@Injectable()
class CoreThemeService extends ThemeService {
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
