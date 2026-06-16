import { ButtonConfiguration } from '@ui/button/button-configuration';
import { MessageDialogContentData } from './message-dialog-content-data';
import { MessageDialogResult } from './message-dialog-result';
import { GeneralDialogChildContentComponent } from '@app/core/ui/dialog/general-dialog-content/general-dialog-child-content';
import { Directive, signal, Signal } from '@angular/core';

@Directive()
export abstract class MessageDialogComponent<
  CONTENT_TYPE extends MessageDialogComponent<CONTENT_TYPE>,
> extends GeneralDialogChildContentComponent<
  MessageDialogContentData<CONTENT_TYPE>,
  MessageDialogResult
> {
  #confirmButtonConfiguration: ButtonConfiguration = this.#createConfirmButtonConfiguration();

  #cancelButtonConfiguration: ButtonConfiguration = this.#createCancelButtonConfiguration();

  #result: MessageDialogResult | undefined;

  public constructor() {
    super();
  }

  public override getResult(): MessageDialogResult | undefined {
    return this.#result;
  }

  protected getConfirmButtonConfiguration(): ButtonConfiguration {
    return this.#confirmButtonConfiguration;
  }

  protected getCancelButtonConfiguration(): ButtonConfiguration {
    return this.#cancelButtonConfiguration;
  }

  #createConfirmButtonConfiguration(): ButtonConfiguration {
    const actionCallbackSignal: Signal<() => void> = signal(this.onConfirm.bind(this));
    const enabledSignal: Signal<boolean> = signal(true);
    const textSignal: Signal<string> = signal(MessageDialogResult.CONFIRM.name);
    return {
      getActionCallback: () => actionCallbackSignal,
      getEnabled: () => enabledSignal,
      getText: () => textSignal,
    };
  }

  #createCancelButtonConfiguration(): ButtonConfiguration {
    const actionCallbackSignal: Signal<() => void> = signal(this.onCancel.bind(this));
    const enabledSignal: Signal<boolean> = signal(true);
    const textSignal: Signal<string> = signal(MessageDialogResult.CANCEL.name);
    return {
      getActionCallback: () => actionCallbackSignal,
      getEnabled: () => enabledSignal,
      getText: () => textSignal,
    };
  }

  protected onConfirm(): void {
    this.#result = MessageDialogResult.CONFIRM;

    this.#closeDialog();
  }

  protected onCancel(): void {
    this.#result = MessageDialogResult.CANCEL;

    this.#closeDialog();
  }

  #closeDialog(): void {
    this.getDialogReference().close();
  }
}
