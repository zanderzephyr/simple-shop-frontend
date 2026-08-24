import { effect, forwardRef, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { convertStringToEnum } from '@core/utils/data-type-utils';
import { Theme } from './theme';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => CoreThemeService),
})
export abstract class ThemeService {
  public constructor() {}

  public abstract getTheme(): Signal<Theme>;

  public abstract setTheme(theme: Theme): void;
}

const themeKey: string = 'theme';
const defaultTheme: Theme = Theme.LIGHT;

@Injectable()
class CoreThemeService extends ThemeService {
  readonly #activeTheme: WritableSignal<Theme> = signal(this.#init());

  public constructor() {
    super();

    effect(() => {
      const currentTheme: Theme = this.#activeTheme();
      document.documentElement.setAttribute(themeKey, currentTheme.id);
      localStorage.setItem(themeKey, currentTheme.id);
    });
  }

  // TODO Init from OS preference
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
