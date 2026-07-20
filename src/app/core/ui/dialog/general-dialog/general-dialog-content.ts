import { ButtonConfiguration } from '@ui/button/button-configuration';
import { DialogContentComponent } from '@ui/dialog/interface/dialog-content';
import { Signal, signal } from '@angular/core';

export abstract class GeneralDialogContentComponent<DATA, RESULT> extends DialogContentComponent<
  DATA,
  RESULT
> {
  readonly #confirmButtonConfiguration: ButtonConfiguration =
    this.#createConfirmButtonConfiguration();

  readonly #cancelButtonConfiguration: ButtonConfiguration =
    this.#createCancelButtonConfiguration();

  readonly #buttonConfigurations: ButtonConfiguration[] = this.createButtonConfigurations();

  #result: RESULT | undefined;

  public constructor() {
    super();
  }

  #createConfirmButtonConfiguration(): ButtonConfiguration {
    const actionCallbackSignal: Signal<() => void> = signal(this.onConfirm.bind(this));
    const enabledSignal: Signal<boolean> = signal(true);
    const textSignal: Signal<string> = signal('Confirm');
    return {
      getActionCallback: () => actionCallbackSignal,
      getEnabled: () => enabledSignal,
      getText: () => textSignal,
    };
  }

  #createCancelButtonConfiguration(): ButtonConfiguration {
    const actionCallbackSignal: Signal<() => void> = signal(this.onCancel.bind(this));
    const enabledSignal: Signal<boolean> = signal(true);
    const textSignal: Signal<string> = signal('Cancel');
    return {
      getActionCallback: () => actionCallbackSignal,
      getEnabled: () => enabledSignal,
      getText: () => textSignal,
    };
  }

  protected onConfirm(): void {
    this.closeDialog();
  }

  protected onCancel(): void {
    this.closeDialog();
  }

  protected closeDialog(): void {
    this.getDialogReference().close();
  }

  /**
   * Overrrite to define specific buttons.
   */
  protected createButtonConfigurations(): ButtonConfiguration[] {
    return [this.getCancelButtonConfiguration(), this.getConfirmButtonConfiguration()];
  }

  protected getConfirmButtonConfiguration(): ButtonConfiguration {
    return this.#confirmButtonConfiguration;
  }

  protected getCancelButtonConfiguration(): ButtonConfiguration {
    return this.#cancelButtonConfiguration;
  }

  public override getResult(): RESULT | undefined {
    return this.#result;
  }

  public setResult(result: RESULT | undefined): this {
    this.#result = result;

    return this;
  }

  public getButtonConfigurations(): ButtonConfiguration[] {
    return this.#buttonConfigurations;
  }
}
