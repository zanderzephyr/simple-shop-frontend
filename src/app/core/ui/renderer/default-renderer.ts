import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { Renderer } from './renderer';

@Directive()
export abstract class DefaultRendererComponent<TYPE> extends Renderer<TYPE> {
	public readonly valueInput: InputSignal<Signal<TYPE>> = input.required<Signal<TYPE>>();

	protected readonly value: Signal<TYPE> = computed(() => this.valueInput()());

	protected constructor() {
		super();
	}
}
