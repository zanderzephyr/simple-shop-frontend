export const ImageType = {
	GALLERY: { id: 'GALLERY' },
	THUMBNAIL: { id: 'THUMBNAIL' }
} as const;
type ValueOf<T> = T[keyof T];
export type ImageType = ValueOf<typeof ImageType>;
