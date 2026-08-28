import { Signal } from '@angular/core';
import { ButtonConfiguration } from '@ui/button/button-configuration';
import { FlexDirection } from '@ui/layout/flex-direction';

export interface ButtonBarConfiguration {
	getButtonConfigurations(): Signal<ButtonConfiguration[]>;

	getFlexDirection(): Signal<FlexDirection>;
}
