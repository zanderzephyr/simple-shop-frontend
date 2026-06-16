import { ButtonConfiguration } from '@ui/button/button-configuration';
import { FlexDirection } from '@ui/layout/flex-direction';
import { Signal } from '@angular/core';

export interface ButtonBarConfiguration {
  getButtonConfigurations(): Signal<ButtonConfiguration[]>;

  getFlexDirection(): Signal<FlexDirection>;
}
