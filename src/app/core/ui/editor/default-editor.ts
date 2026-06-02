import { Directive, input, InputSignal } from '@angular/core';
import { Editor } from './editor';

@Directive()
// TODO This class must not just get the value, but must also be able to set the value.
export abstract class DefaultEditor<TYPE> implements Editor<TYPE> {
  readonly interfaceTag: 'editor' = 'editor';

  protected readonly value: InputSignal<TYPE> = input.required<TYPE>();

  public constructor() {}
}
