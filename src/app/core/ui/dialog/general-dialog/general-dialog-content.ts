import { ButtonConfiguration } from '@ui/button/button-configuration';
import { DialogContentComponent } from '@ui/dialog/interface/dialog-content';
import { Signal } from '@angular/core';

export abstract class GeneralDialogContentComponent<DATA, RESULT> extends DialogContentComponent<
  DATA,
  RESULT
> {
  public constructor() {
    super();
  }

  public abstract getButtonConfigurations(): Signal<ButtonConfiguration[]>;
}
