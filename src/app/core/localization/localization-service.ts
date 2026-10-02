import { Injectable, Signal } from '@angular/core';
import { Localization } from './localization';

@Injectable()
export abstract class LocalizationService {
	protected constructor() {
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
