export const MediaType = {
  BOOK: { id: 'BOOK', name: 'Book' },
  GAME: { id: 'GAME', name: 'Game' },
  MOVIE: { id: 'MOVIE', name: 'Movie' },
} as const;
type ValueOf<T> = T[keyof T];
export type MediaType = ValueOf<typeof MediaType>;

export function compareMediaTypes(o1: MediaType | null, o2: MediaType | null): boolean {
  return o1?.id === o2?.id;
}
