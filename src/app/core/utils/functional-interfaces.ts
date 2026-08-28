import { createFunctionSchema } from '@core/utils/type-utils';
import { ZodType } from 'zod';

export type Function<T, U> = (t: T) => U;

export function zodFunction<T, U>(): ZodType<Function<T, U>> {
	return createFunctionSchema<Function<T, U>>();
}

export type Predicate<T> = (t: T) => boolean;

export function zodPredicate<T>(): ZodType<Predicate<T>> {
	return createFunctionSchema<Predicate<T>>();
}

export type Runnable = () => void;

export function zodRunnable(): ZodType<Runnable> {
	return createFunctionSchema<Runnable>();
}

export type Supplier<T> = () => T;

export function zodSupplier<T>(): ZodType<Supplier<T>> {
	return createFunctionSchema<Supplier<T>>();
}

export type Consumer<T> = (t: T) => void;

export function zodConsumer<T>(): ZodType<Consumer<T>> {
	return createFunctionSchema<Consumer<T>>();
}

export type BiConsumer<T, U> = (t: T, u: U) => void;

export function zodBiConsumer<T, U>(): ZodType<BiConsumer<T, U>> {
	return createFunctionSchema<BiConsumer<T, U>>();
}
