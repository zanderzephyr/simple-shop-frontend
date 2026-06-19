// TODO Move to Angular utils library

export function extractNumberValue(event: Event): number | null {
  const rawValue: string | null = extractStringValue(event);
  if (rawValue === null) {
    return null;
  }

  let numberValue: number | null = null;

  /*
			Number() returns NaN for non-numeric strings.
     	Number.isFinite() returns false for NaN, Infinity, and -Infinity, and true for all other numbers.
		 	(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)
		 */
  if (rawValue && Number.isFinite(Number(rawValue))) {
    numberValue = Number(rawValue);
  }

  return numberValue;
}

export function extractStringValue(event: Event): string | null {
  if (!event || !event.target || !(event.target instanceof HTMLInputElement)) {
    return null;
  }

  const inputElement: HTMLInputElement = event.target as HTMLInputElement;
  return inputElement.value;
}
