import {
  computed,
  effect,
  forwardRef,
  inject,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { convertStringToEnum } from '@core/utils/data-type-utils';
import { Localization } from './localization';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => CoreLocalizationService),
})
export abstract class LocalizationService {
  public constructor() {
    // Nothing to do so far
  }

  /**
   * Tries to determine the (localized) value for the given key.
   * If there is no value for this key, a fallback will be returned
   * and the case logged on error level.
   *
   * This method must be called from inside a terminal signal like
   * effect or computed if reactivity is desired.
   */
  public abstract getValue(key: string): string;

  public abstract getLocalization(): Signal<Localization>;

  public abstract setLocalization(localization: Localization): void;

  public abstract isInitialized(): Signal<boolean>;
}

const missingPlaceholderKey: string = 'app.global.localization.missingPlaceholder';
const localizationKey: string = 'localization';
const defaultLocalization: Localization = Localization.ENGLISH;

// TODO Does ng mat theming need to be updated?
// TODO Init from OS preference if possible
@Injectable()
class CoreLocalizationService extends LocalizationService {
  readonly #http: HttpClient = inject(HttpClient);

  readonly #activeLocalization: WritableSignal<Localization> = signal(this.#init());

  readonly #localizationMapping: WritableSignal<unknown | undefined> = signal(undefined);

  readonly #isInitialized: Signal<boolean> = computed(
    () => this.#localizationMapping() !== undefined,
  );

  public constructor() {
    super();

    effect(() => {
      const currentLocalization: Localization = this.#activeLocalization();

      firstValueFrom(
        this.#http.get('localization/' + currentLocalization.id.toLowerCase() + '.json'),
      ).then(
        (file) => this.#localizationMapping.set(file),
        (reason) => console.error('Failed to load localization resource: ' + reason),
      );

      localStorage.setItem(localizationKey, currentLocalization.id);
    });
  }

  #init(): Localization {
    let localizationString: string | null = localStorage.getItem(localizationKey);
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
      mappedValue = this.#splitKeyAndRetrieveValue(missingPlaceholderKey, localization);
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
        .split('.')
        .reduce(
          (previousValue, currentValue) => previousValue?.[currentValue],
          localization as any,
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
