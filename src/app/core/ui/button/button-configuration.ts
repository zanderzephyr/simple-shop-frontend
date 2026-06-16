import { Runnable } from '@utils/functional-interfaces';
import { Signal } from '@angular/core';

export interface ButtonConfiguration {
  getText(): Signal<string>;

  getEnabled(): Signal<boolean>;

  getActionCallback(): Signal<Runnable>;
}
