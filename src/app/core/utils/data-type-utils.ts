import { IllegalArgumentError } from '@core/utils/common-errors';

export function convertStringToEnum<ENUM extends Record<string, any>>(
  idValue: string | undefined | null,
  enumObject: ENUM,
): ENUM[keyof ENUM] | undefined {
  if (!idValue) {
    return undefined;
  }

  // Search the values of the object for a matching id property
  const result: ENUM[keyof ENUM] | undefined = Object.values(enumObject).find(
    (value) => value && typeof value === 'object' && 'id' in value && value.id === idValue,
  );
  if (result === undefined) {
    throw new IllegalArgumentError('No matching enum value found for id: ' + idValue);
  }

  return result;
}
