import { computed, signal, Signal, WritableSignal } from '@angular/core';
import { Function } from '@core/utils/functional-interfaces';

export class WritableComputedSignal<A, B> {
	readonly #inputSignal: WritableSignal<A>;
	readonly #outputSignal: Signal<B>;

	public constructor(value: A, intermediateFunction: Function<A, B>) {
		this.#inputSignal = signal(value);
		this.#outputSignal = computed(() => intermediateFunction(this.#inputSignal()));
	}

	public getValue(): Signal<B> {
		return this.#outputSignal;
	}

	public setValue(value: A): this {
		this.#inputSignal.set(value);

		return this;
	}
}
