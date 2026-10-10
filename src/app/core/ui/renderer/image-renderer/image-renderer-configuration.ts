import { z, ZodType } from 'zod';

export class ImageRendererConfiguration {
	readonly #url: string | undefined;

	constructor(url: string | undefined) {
		this.#url = url;
	}

	public getUrl(): string | undefined {
		return this.#url;
	}
}

export function zodImageRendererConfiguration(): ZodType<ImageRendererConfiguration> {
	return z.instanceof(ImageRendererConfiguration);
}
