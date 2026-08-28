import { z, ZodType } from 'zod';

export class ImageRendererConfiguration {
	readonly #url: string;

	constructor(url: string) {
		this.#url = url;
	}

	public getUrl(): string {
		return this.#url;
	}
}

export function zodImageRendererConfiguration(): ZodType<ImageRendererConfiguration> {
	return z.instanceof(ImageRendererConfiguration);
}
