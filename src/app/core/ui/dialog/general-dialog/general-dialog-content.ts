import { computed, inject, Signal, signal } from '@angular/core';
import { LocalizationService } from '@core/localization/localization-service';
import { ButtonConfiguration } from '@ui/button/button-configuration';
import { DialogContentComponent } from '@ui/dialog/interface/dialog-content';
import * as Keys from './general-dialog-utils';

export abstract class GeneralDialogContentComponent<DATA, RESULT> extends DialogContentComponent<
	DATA,
	RESULT
> {
	readonly #localizationService: LocalizationService = inject(LocalizationService);

	readonly #confirmButtonConfiguration: ButtonConfiguration =
		this.#createConfirmButtonConfiguration();

	readonly #cancelButtonConfiguration: ButtonConfiguration =
		this.#createCancelButtonConfiguration();

	readonly #closeButtonConfiguration: ButtonConfiguration =
		this.#createCloseButtonConfiguration();

	readonly #buttonConfigurations: ButtonConfiguration[] = this.createButtonConfigurations();

	#result: RESULT | undefined;

	protected constructor() {
		super();
	}

	#createConfirmButtonConfiguration(): ButtonConfiguration {
		const actionCallbackSignal: Signal<() => void> = signal(this.onConfirm.bind(this));
		const enabledSignal: Signal<boolean> = signal(true);
		const textSignal: Signal<string> = computed(() => this.#localizationService.getValue(Keys.OK_BUTTON_KEY));
		return {
			getActionCallback: () => actionCallbackSignal,
			getEnabled: () => enabledSignal,
			getText: () => textSignal
		};
	}

	#createCancelButtonConfiguration(): ButtonConfiguration {
		const actionCallbackSignal: Signal<() => void> = signal(this.onCancel.bind(this));
		const enabledSignal: Signal<boolean> = signal(true);
		const textSignal: Signal<string> = computed(() => this.#localizationService.getValue(Keys.CANCEL_BUTTON_KEY));
		return {
			getActionCallback: () => actionCallbackSignal,
			getEnabled: () => enabledSignal,
			getText: () => textSignal
		};
	}

	#createCloseButtonConfiguration(): ButtonConfiguration {
		const actionCallbackSignal: Signal<() => void> = signal(this.onCancel.bind(this));
		const enabledSignal: Signal<boolean> = signal(true);
		const textSignal: Signal<string> = computed(() => this.#localizationService.getValue(Keys.CLOSE_BUTTON_KEY));
		return {
			getActionCallback: () => actionCallbackSignal,
			getEnabled: () => enabledSignal,
			getText: () => textSignal
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
	 * Override to define specific buttons.
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

	protected getCloseButtonConfiguration(): ButtonConfiguration {
		return this.#closeButtonConfiguration;
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
