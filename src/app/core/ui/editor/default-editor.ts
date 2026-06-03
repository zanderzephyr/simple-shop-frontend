import { Signal, computed, Directive, input, InputSignal } from '@angular/core';
import { Editor } from './editor';

@Directive()
// TODO This class must not just get the value, but must also be able to set the value.
export abstract class DefaultEditor<TYPE> implements Editor<TYPE> {
  readonly interfaceTag: 'editor' = 'editor';

  protected readonly valueInput: InputSignal<Signal<TYPE>> = input.required<Signal<TYPE>>();

  protected readonly value: Signal<TYPE> = computed(() => this.valueInput()());

  public constructor() {}
}
