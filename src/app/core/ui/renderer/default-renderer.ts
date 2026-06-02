import { Directive, input, InputSignal } from '@angular/core';
import { Renderer } from './renderer';

@Directive()
export abstract class DefaultRenderer<TYPE> implements Renderer<TYPE> {
  readonly interfaceTag: 'renderer' = 'renderer';

  protected readonly value: InputSignal<TYPE> = input.required<TYPE>();

  public constructor() {}
}
