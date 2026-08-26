import { effect, forwardRef, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { convertStringToEnum } from '@core/utils/data-type-utils';
import { Theme } from './theme';
import { IllegalArgumentError } from '@core/utils/common-errors';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => NgMatThemeService),
})
export abstract class ThemeService {
  public constructor() {
    // Nothing to do so far
  }

  public abstract getTheme(): Signal<Theme>;

  public abstract setTheme(theme: Theme): void;
}

const themeKey: string = 'theme';
const defaultTheme: Theme = Theme.LIGHT;

// TODO Init from OS preference
@Injectable()
class NgMatThemeService extends ThemeService {
  readonly #activeTheme: WritableSignal<Theme> = signal(this.#init());

  public constructor() {
    super();

    effect(() => {
      const currentTheme: Theme = this.#activeTheme();

      let colorSchemeValue: string = this.#mapThemeToNgMatColorSchemeValue(currentTheme);
      document.documentElement.style.colorScheme = colorSchemeValue;

      localStorage.setItem(themeKey, currentTheme.id);
    });
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

  #init(): Theme {
    let themeString: string | null = localStorage.getItem(themeKey);
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
