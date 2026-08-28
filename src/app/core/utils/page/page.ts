import { z, ZodType } from 'zod';
import { PageMetaData, PageMetaDataDto, zodPageMetaData } from './page-meta-data';

export class Page<T> {
	readonly #content: T[];

	readonly #pageMetaData: PageMetaData;

	public constructor(content: T[], pageMetaData: PageMetaData) {
		this.#content = [...content];
		this.#pageMetaData = pageMetaData;

		Object.freeze(this);
	}

	public getContent(): readonly T[] {
		return Object.freeze(this.#content);
	}

	public getPageMetaData(): PageMetaData {
		return this.#pageMetaData;
	}
}

export interface PageDto<T> {
	content: T[];
	page: PageMetaDataDto;
}

interface PageRawDto<T> {
	content: T[];
	page: PageMetaData;
}

function zodPageDto<T>(innerSchema: ZodType<T>): ZodType<PageRawDto<T>> {
	return z.object({
		content: z.array(innerSchema),
		page: zodPageMetaData()
	});
}

export function zodPage<T>(innerSchema: ZodType<T>): ZodType<Page<T>> {
	return zodPageDto<T>(innerSchema).transform(
		(data): Page<T> => new Page<T>(data.content, data.page)
	);
}
