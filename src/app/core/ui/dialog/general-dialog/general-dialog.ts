import {
	Component,
	ComponentRef,
	computed,
	effect,
	inject,
	signal,
	Signal,
	Type,
	viewChild,
	ViewContainerRef,
	WritableSignal
} from '@angular/core';
import { LocalizationService } from '@core/localization/localization-service';
import { ButtonBarComponent } from '@ui/button-bar/button-bar';
import { ButtonBarConfiguration } from '@ui/button-bar/button-bar-configuration';
import { ButtonConfiguration } from '@ui/button/button-configuration';
import { DialogContentComponent } from '@ui/dialog/interface/dialog-content';
import { FlexDirection } from '@ui/layout/flex-direction';
import { GeneralDialogContentComponent } from './general-dialog-content';
import { GeneralDialogData } from './general-dialog-data';

@Component({
	selector: 'app-general-dialog',
	imports: [ButtonBarComponent],
	templateUrl: './general-dialog.html',
	styleUrl: './general-dialog.scss'
})
export class GeneralDialogComponent<
	DATA extends GeneralDialogData<DATA, RESULT, CONTENT>,
	RESULT,
	CONTENT extends GeneralDialogContentComponent<DATA, RESULT>,
> extends DialogContentComponent<DATA, RESULT> {
	readonly #localizationService: LocalizationService = inject(LocalizationService);

	readonly contentChild: Signal<ViewContainerRef | undefined> = viewChild('content', {
		read: ViewContainerRef
	});

	// Keep a local reference to the active dynamic component instance
	#contentChildComponentRef: WritableSignal<ComponentRef<CONTENT> | undefined> = signal(undefined);

	readonly #buttonConfigurations: Signal<ButtonConfiguration[]> = computed(() => {
		const componentRef: ComponentRef<CONTENT> | undefined = this.#contentChildComponentRef();
		if (componentRef !== undefined) {
			return componentRef.instance.getButtonConfigurations();
		}
		return [];
	});

	protected readonly title: Signal<string> = computed(() => {
			const t: string = this.getDialogData().getTitle()();
			return this.#localizationService.getValue(t);
		}
	);

	protected readonly buttonBarConfiguration: Signal<ButtonBarConfiguration> = computed(() => {
		const buttonConfigurations: Signal<ButtonConfiguration[]> = this.#buttonConfigurations;
		const flexDirection: Signal<FlexDirection> = signal(FlexDirection.ROW);
		return {
			getButtonConfigurations: () => buttonConfigurations,
			getFlexDirection: () => flexDirection
		};
	});

	public constructor() {
		super();

		this.#init();
	}

	#init(): void {
		effect(() => {
			// Register signal
			const viewContainer: ViewContainerRef | undefined = this.contentChild();

			const type: Type<CONTENT> = this.getDialogData().getChildContentType();

			// Only do that if the template is already built
			if (viewContainer !== undefined) {
				let componentRef: ComponentRef<CONTENT> | undefined = this.#contentChildComponentRef();
				if (componentRef === undefined || componentRef.componentType !== type) {
					this.#clearComponent();
					this.#contentChildComponentRef.set(viewContainer.createComponent(type));
					componentRef = this.#contentChildComponentRef();
					componentRef!.instance.setDialogReference(this.getDialogReference());
				}
			}
		});
	}

	#clearComponent(): void {
		const componentRef: ComponentRef<CONTENT> | undefined = this.#contentChildComponentRef();
		if (componentRef !== undefined) {
			componentRef.destroy();
			this.#contentChildComponentRef.set(undefined);
			this.contentChild()!.clear();
		}
	}

	public override getResult(): RESULT | undefined {
		return this.#contentChildComponentRef()!.instance.getResult();
	}
}
