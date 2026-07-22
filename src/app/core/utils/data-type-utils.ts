import { IllegalArgumentError } from '@core/utils/common-errors';
import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';

const DEFAULT_DATE_TIME_FORMATTER: DateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

export const JAVA_MAX_INT_VALUE: number = 2147483647;

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

export function parseLocalDateTime(
  dateTimeString: string,
  formatter?: DateTimeFormatter,
): LocalDateTime {
  try {
    return LocalDateTime.parse(dateTimeString, formatter || DEFAULT_DATE_TIME_FORMATTER);
  } catch (error) {
    throw new IllegalArgumentError('Invalid date-time string: ' + dateTimeString);
  }
}

export function localDateTimeToString(
  localDateTime: LocalDateTime,
  formatter?: DateTimeFormatter,
): string {
  return localDateTime.format(formatter || DEFAULT_DATE_TIME_FORMATTER);
}
