export interface Formatter<TYPE> {
  formatFromString(value: string): TYPE;

  formatToString(value: TYPE): string;
}

export class StringFormatter implements Formatter<string> {
  formatFromString(value: string): string {
    return value;
  }

  formatToString(value: string): string {
    return value;
  }
}
