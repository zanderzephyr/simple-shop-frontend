import { Signal } from '@angular/core';
import { Runnable } from '@core/utils/functional-interfaces';

export interface ButtonConfiguration {
	getText(): Signal<string>;

	getEnabled(): Signal<boolean>;

	getActionCallback(): Signal<Runnable>;
}
