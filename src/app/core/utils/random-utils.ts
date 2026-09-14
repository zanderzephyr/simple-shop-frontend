export function generateRandomNumber(minIncluded: number, maxExcluded: number): number {
	const range: number = maxExcluded - minIncluded;
	return minIncluded + Math.floor(Math.random() * range);
}

export function generateRandomNumericalString(length: number): string {
	const characters = '0123456789';
	return generateRandomString(length, characters);
}

export function generateRandomAlphabeticalString(length: number): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	return generateRandomString(length, characters);
}

export function generateRandomString(length: number, possibleValues: string): string {
	let result: string = '';
	for (let i: number = 0; i < length; i++) {
		const randomIndex: number = generateRandomIndex(0, possibleValues.length);
		result += possibleValues.charAt(randomIndex);
	}
	return result;
}

export function generateRandomLargeString(length: number, possibleValues: string): string {
	const result: string[] = []; // Use an array as a buffer instead of a string
	for (let i: number = 0; i < length; i++) {
		const randomIndex: number = generateRandomIndex(0, possibleValues.length);
		result.push(possibleValues.charAt(randomIndex));
	}
	return result.join(''); // Glue them together at the very end
}

export function generateRandomIndex(minIncluded: number, maxExcluded: number): number {
	const range: number = maxExcluded - minIncluded;
	return minIncluded + Math.floor(Math.random() * range);
}

/**
 * Draws a random sublist of a list. The size of the sublist is at max sampleSize, according to how
 * many elements the list has.
 *
 * @param list
 * @param sublistLength
 */
export function drawRandomSublist<T>(list: readonly T[], sublistLength: number): T[] {
	const sublist: T[] = [];

	const listCopy: T[] = [...list];
	const sampleSize: number = Math.min(sublistLength, listCopy.length);
	for (let i: number = 0; i < sampleSize; i++) {
		const index: number = generateRandomIndex(0, sampleSize - i);
		sublist.push(listCopy.splice(index, 1)[0]);
	}

	return sublist;
}
