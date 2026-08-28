/*
 TS is not capably of dealing properly with types on its own.
 We need to create support for our regular use cases ourselves.

 TODO There might be a library taking care of all that already.
 It seems odd to be the first ever to tackle this issue.
*/

import { Component, Directive, input, InputSignal, Type } from '@angular/core';

// Defines the possible categories of types in JS/TS
export type TypeToken =
	| 'primitive'
	| 'array'
	| 'object'
	| 'class'
	| 'union'
	| 'function'
	| 'unknown';

// Just for type safety of the generic type of RuntimeType.
const RUNTIME_TYPE_SYMBOL = Symbol('RuntimeTypeSymbol');

// The universal interface that carries BOTH the compile-time type and runtime metadata
export interface RuntimeType<T> {
	readonly type: TypeToken;
	readonly name: string;

	// A dummy property that only exists for the compiler to lock down the generic T
	[RUNTIME_TYPE_SYMBOL]?(): T;

	// A standard type-guarding utility function
	is(value: unknown): value is T;
}

const stringType: RuntimeType<string> = Object.freeze({
	type: 'primitive',
	name: 'string',
	is: (v: unknown): v is string => typeof v === 'string'
});

// Take care: NaN is also a number in JS, so we accept it as well.
const numberType: RuntimeType<number> = Object.freeze({
	type: 'primitive',
	name: 'number',
	is: (v: unknown): v is number => typeof v === 'number'
});

const booleanType: RuntimeType<boolean> = Object.freeze({
	type: 'primitive',
	name: 'boolean',
	is: (v: unknown): v is boolean => typeof v === 'boolean'
});

const dateType: RuntimeType<Date> = Object.freeze({
	type: 'primitive',
	name: 'date',
	// Ensures it's a valid, parseable date
	is: (v: unknown): v is Date => v instanceof Date && !isNaN(v.getTime())
});
const bigintType: RuntimeType<bigint> = Object.freeze({
	type: 'primitive',
	name: 'bigint',
	is: (v: unknown): v is bigint => typeof v === 'bigint'
});
const undefinedType: RuntimeType<undefined> = Object.freeze({
	type: 'primitive',
	name: 'undefined',
	is: (v: unknown): v is undefined => typeof v === 'undefined'
});
const nullType: RuntimeType<null> = Object.freeze({
	type: 'primitive',
	name: 'null',
	is: (v: unknown): v is null => v === null
});
const symbolType: RuntimeType<symbol> = Object.freeze({
	type: 'primitive',
	name: 'symbol',
	is: (v: unknown): v is symbol => typeof v === 'symbol'
});
const voidType: RuntimeType<void> = Object.freeze({
	type: 'primitive',
	name: 'void',
	// In JS, runtime void is always undefined
	is: (v: unknown): v is void => typeof v === 'undefined'
});
const unknownType: RuntimeType<unknown> = Object.freeze({
	type: 'unknown',
	name: 'unknown',
	is: (v: unknown): v is unknown => true
});

// Universal Collections (Solves the array/list problem cleanly)
function arrayOf<E>(elementType: RuntimeType<E>): RuntimeType<E[]> {
	return Object.freeze({
		type: 'array',
		name: elementType.name + '[]',
		is: (v: unknown): v is E[] => Array.isArray(v) && v.every((item) => elementType.is(item))
	});
}

// Custom Shapes / Interfaces / Plain Objects (classes are not required in JS/TS)
function objectOf<S extends Record<string, RuntimeType<any>>>(
	name: string,
	shape: S
): RuntimeType<{ [K in keyof S]: S[K] extends RuntimeType<infer U> ? U : never }> {
	type InferredType = { [K in keyof S]: S[K] extends RuntimeType<infer U> ? U : never };

	return Object.freeze({
		type: 'object',
		name,
		is: (v: unknown): v is InferredType => {
			if (typeof v !== 'object' || v === null || Array.isArray(v)) {
				return false;
			}
			const obj = v as Record<string, unknown>;
			return Object.keys(shape).every((key) => shape[key].is(obj[key]));
		}
	});
}

// Real Classes
function classOf<C>(constructor: new (...args: any[]) => C): RuntimeType<C> {
	return Object.freeze({
		type: 'class',
		name: constructor.name,
		is: (v: unknown): v is C => v instanceof constructor
	});
}

// Union Types (e.g., string | number)
function unionOf<T extends any[]>(
	...elementTypes: { [K in keyof T]: RuntimeType<T[K]> }
): RuntimeType<T[number]> {
	return Object.freeze({
		type: 'union',
		name: elementTypes.map((t) => t.name).join(' | '),
		is: (v: unknown): v is T[number] => elementTypes.some((elementType) => elementType.is(v))
	});
}

// Allows a type to be null (e.g., string | null)
function nullableOf<E>(elementType: RuntimeType<E>): RuntimeType<E | null> {
	return Object.freeze({
		type: 'union',
		name: elementType.name + ' | null',
		is: (v: unknown): v is E | null => v === null || elementType.is(v)
	});
}

// Allows a type to be undefined (e.g., number | undefined)
function optionalOf<E>(elementType: RuntimeType<E>): RuntimeType<E | undefined> {
	return Object.freeze({
		type: 'union',
		name: elementType.name + ' | undefined',
		is: (v: unknown): v is E | undefined => v === undefined || elementType.is(v)
	});
}

const functionType: RuntimeType<Function> = Object.freeze({
	type: 'function',
	name: 'Function',
	is: (v: unknown): v is Function => typeof v === 'function'
});

function literalOf<V extends string | number | boolean>(value: V): RuntimeType<V> {
	return Object.freeze({
		type: 'primitive',
		name: typeof value === 'string' ? '"' + value + '"' : String(value),
		is: (v: unknown): v is V => v === value
	});
}

export const Types = Object.freeze({
	string: stringType,
	number: numberType,
	boolean: booleanType,
	date: dateType,
	bigint: bigintType,
	undefined: undefinedType,
	null: nullType,
	symbol: symbolType,
	void: voidType,
	unknown: unknownType,
	function: functionType,

	arrayOf,
	objectOf,
	classOf,
	unionOf,
	nullableOf,
	optionalOf,
	literalOf
});

export class TypeAndValue<T> {
	readonly #type: RuntimeType<T>;
	readonly #value: T;

	public constructor(type: RuntimeType<T>, value: T) {
		this.#type = type;
		this.#value = value;
	}

	public getType(): RuntimeType<T> {
		return this.#type;
	}

	public getValue(): T {
		return this.#value;
	}
}

export class TypeUnknownConverter<T> {
	readonly #typeToken: RuntimeType<T>;

	public constructor(typeToken: RuntimeType<T>) {
		this.#typeToken = typeToken;
	}

	// Uses the runtime validation to  type-cast data safely
	public convert(rawData: unknown): T {
		if (this.#typeToken.is(rawData)) {
			// Inside this block, TypeScript automatically knows rawData is exactly TYPE T
			return rawData;
		}
		let actualType: string = typeof rawData;
		if (rawData === null) {
			actualType = 'null';
		} else if (rawData === undefined) {
			actualType = 'undefined';
		} else if (Array.isArray(rawData)) {
			actualType = 'Array';
		}
		// Catch empty/null prototype objects explicitly
		else if (rawData && typeof rawData === 'object' && Object.getPrototypeOf(rawData) === null) {
			actualType = 'Object (null prototype)';
		} else if (rawData.constructor?.name) {
			actualType = rawData.constructor.name;
		}
		throw new Error(
			'Type validation failed. Expected ' + this.#typeToken.name + ', got ' + actualType
		);
	}
}

// Example1: Type validation and conversion
const idType: RuntimeType<string | number> = Types.unionOf(Types.string, Types.number);
const idValidator: TypeUnknownConverter<string | number> = new TypeUnknownConverter(idType);
const validationResult1_1: string | number = idValidator.convert('A-102');
const validationResult1_2: string | number = idValidator.convert(4005);
const validationResult1_3: string | number = idValidator.convert(true); // throws
// Example2: Type validation and conversion with null
const birthDateType: RuntimeType<Date | null> = Types.nullableOf(Types.date);
const dateValidator: TypeUnknownConverter<Date | null> = new TypeUnknownConverter(birthDateType);
const validationResult2_1: Date | null = dateValidator.convert(new Date());
const validationResult2_2: Date | null = dateValidator.convert(null);
const validationResult2_3: Date | null = dateValidator.convert('2026-06-03'); // throws

// Example 3: Pass types
class MyClass<T, TYPE extends RuntimeType<T> = RuntimeType<T>> {
	readonly #type: TYPE;
	readonly #componentType: Type<SomeComponentParent<T>>;

	constructor(type: TYPE, componentType: Type<SomeComponentParent<T>>) {
		this.#type = type;
		this.#componentType = componentType;
	}
}

@Directive()
abstract class SomeComponentParent<T, TYPE extends RuntimeType<T> = RuntimeType<T>> {
	/*
		  Better not really store things like that here. This is just an example of
		   how to use these types. That kind of stuff is too much dependency for a
		  simple component.
	   */
	readonly #type: TYPE;
	protected readonly value: InputSignal<T> = input.required<T>();

	public constructor(type: TYPE) {
		this.#type = type;
	}
}

@Component({
	selector: 'app-a-child',
	imports: [],
	template: '<p>a-child works!</p>'
})
class AChild extends SomeComponentParent<string> {
	public constructor() {
		super(Types.string);
	}
}

const myClass: MyClass<string> = new MyClass(Types.string, AChild);
