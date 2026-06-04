import { z, ZodType, ZodObject, ZodRawShape } from 'zod';
import { IllegalArgumentError } from '@utils/common-errors';

// Using any as return type makes sure void types are accepted as return types in every strict scenario.
type AnyFunction = (...args: any[]) => any;

function isFunction(val: unknown): boolean {
  return typeof val === 'function';
}

export function createFunctionSchema<T extends AnyFunction>(): ZodType<T> {
  return z.custom<T>(isFunction, {
    message: 'Expected a valid function',
  });
}

// Structural shape constraint: An object whose values are objects containing a string 'id'
type IdRecord = { readonly id: string; [key: string]: unknown };
type GenericEnumObject = Record<string, IdRecord>;

// Reusable utility type to extract the exact value type of the enum records
type ValueOf<T> = T[keyof T];

/**
 * Dynamically builds a Zod validation schema for any custom object enum structured with an 'id' property
 * and any additional properties (e.g., 'name').
 */
export function createEnumSchema<T extends GenericEnumObject>(enumObject: T): ZodType<ValueOf<T>> {
  // Extract the underlying full objects (e.g., { id: 'BOOK', name: 'Book' })
  const enumValues: ValueOf<T>[] = Object.values(enumObject) as ValueOf<T>[];
  if (enumValues.length === 0) {
    throw new IllegalArgumentError('No enum constants!');
  }

  // Map each enum value object to a concrete ZodObject schema containing literal rules for every property
  const objectSchemas: ZodObject<ZodRawShape>[] = enumValues.map(
    (value: ValueOf<T>): ZodObject<ZodRawShape> => {
      // Create a mutable local record to bypass ZodRawShape's read-only restriction
      const shape: Record<string, z.ZodTypeAny> = {};

      for (const propertyKey of Object.keys(value)) {
        const propertyValue: any = value[propertyKey];
        shape[propertyKey] = z.literal(propertyValue);
      }

      return z.object(shape);
    },
  );

  // Enforces a fixed minimum of 2 items to completely protect Zod's internal signatures
  if (objectSchemas.length === 1) {
    return objectSchemas[0] as unknown as ZodType<ValueOf<T>>;
  }
  type ObjectTuple = [ZodObject<ZodRawShape>, ZodObject<ZodRawShape>, ...ZodObject<ZodRawShape>[]];
  return z.union(objectSchemas as ObjectTuple) as unknown as ZodType<ValueOf<T>>;
}
