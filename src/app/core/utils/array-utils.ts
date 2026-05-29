/**
 * Create a range from min inclusive to max exclusive.
 */
export function createRange(minInclusive: number, maxExclusive: number): number[] {
  if (minInclusive >= maxExclusive) {
    return [];
  }

  return Array.from({ length: maxExclusive - minInclusive }, (_, i) => minInclusive + i);
}
