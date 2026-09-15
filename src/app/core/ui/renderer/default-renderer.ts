import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { Renderer } from './renderer';

@Directive()
export abstract class DefaultRendererComponent<TYPE> implements Renderer<TYPE> {
	readonly interfaceTag: 'renderer' = 'renderer';

	public readonly valueInput: InputSignal<Signal<TYPE>> = input.required<Signal<TYPE>>();

	protected readonly value: Signal<TYPE> = computed(() => this.valueInput()());

	protected constructor() {
		// Nothing to do so far
	}
}
