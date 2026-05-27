export type Function<T, U> = (t: T) => U;

export type Predicate<T> = (t: T) => boolean;

export type Runnable = () => void;

export type Supplier<T> = () => T;

export type Consumer<T> = (t: T) => void;

export type BiConsumer<T, U> = (t: T, u: U) => void;
