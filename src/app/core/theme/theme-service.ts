import { Injectable, Signal } from '@angular/core';
import { Theme } from './theme';

@Injectable()
export abstract class ThemeService {
	protected constructor() {
		// Nothing to do so far
	}

	public abstract getTheme(): Signal<Theme>;

	public abstract setTheme(theme: Theme): void;
}
