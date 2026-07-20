import { ButtonBarComponent } from '@ui/button-bar/button-bar';
import { ButtonConfiguration } from '@ui/button/button-configuration';
import { ButtonBarConfiguration } from '@ui/button-bar/button-bar-configuration';
import { DialogContentComponent } from '@ui/dialog/interface/dialog-content';
import { FlexDirection } from '@ui/layout/flex-direction';
import { GeneralDialogContentComponent } from './general-dialog-content';
import { GeneralDialogData } from './general-dialog-data';
import {
  Component,
  ComponentRef,
  computed,
  inject,
  Injector,
  effect,
  signal,
  Signal,
  Type,
  ViewContainerRef,
  viewChild,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-general-dialog',
  imports: [ButtonBarComponent],
  templateUrl: './general-dialog.html',
  styleUrl: './general-dialog.css',
})
export class GeneralDialogComponent<
  DATA extends GeneralDialogData<DATA, RESULT, CONTENT>,
  RESULT,
  CONTENT extends GeneralDialogContentComponent<DATA, RESULT>,
> extends DialogContentComponent<DATA, RESULT> {
  readonly #injector: Injector = inject(Injector);

  readonly contentChild: Signal<ViewContainerRef | undefined> = viewChild('content', {
    read: ViewContainerRef,
  });

  // Keep a local reference to the active dynamic component instance
  #contentChildComponentRef: WritableSignal<ComponentRef<CONTENT> | undefined> = signal(undefined);

  readonly #buttonConfigurations: Signal<ButtonConfiguration[]> = computed(() => {
    const componentRef: ComponentRef<CONTENT> | undefined = this.#contentChildComponentRef();
    if (componentRef) {
      return componentRef.instance.getButtonConfigurations();
    }
    return [];
  });

  protected readonly buttonBarConfiguration: Signal<ButtonBarConfiguration> = computed(() => {
    const buttonConfigurations: Signal<ButtonConfiguration[]> = this.#buttonConfigurations;
    const flexDirection: Signal<FlexDirection> = signal(FlexDirection.ROW);
    return {
      getButtonConfigurations: () => buttonConfigurations,
      getFlexDirection: () => flexDirection,
    };
  });

  public constructor() {
    super();

    this.#init();
  }

  #init(): void {
    effect(() => {
      // Register signals
      const viewContainer: ViewContainerRef | undefined = this.contentChild();
      const type: Type<CONTENT> = this.getDialogData().getChildContentType();

      // Only do that if the template is already built
      if (viewContainer) {
        let componentRef: ComponentRef<CONTENT> | undefined = this.#contentChildComponentRef();
        if (!componentRef || componentRef.componentType !== type) {
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
    if (componentRef) {
      componentRef.destroy();
      this.#contentChildComponentRef.set(undefined);
      this.contentChild()!.clear();
    }
  }

  public override getResult(): RESULT | undefined {
    return this.#contentChildComponentRef()!.instance.getResult();
  }
}
