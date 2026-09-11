export const MediaType = {
	BOOK: { id: 'BOOK' },
	GAME: { id: 'GAME' },
	MOVIE: { id: 'MOVIE' }
} as const;
type ValueOf<T> = T[keyof T];
export type MediaType = ValueOf<typeof MediaType>;

export function compareMediaTypes(o1: MediaType | null, o2: MediaType | null): boolean {
	return o1?.id === o2?.id;
}
