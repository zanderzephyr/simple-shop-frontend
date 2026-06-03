import { computed, Signal, Directive, input, InputSignal } from '@angular/core';
import { Renderer } from './renderer';

@Directive()
export abstract class DefaultRenderer<TYPE> implements Renderer<TYPE> {
  readonly interfaceTag: 'renderer' = 'renderer';

  protected readonly valueInput: InputSignal<Signal<TYPE>> = input.required<Signal<TYPE>>();

  protected readonly value: Signal<TYPE> = computed(() => this.valueInput()());

  public constructor() {}
}
