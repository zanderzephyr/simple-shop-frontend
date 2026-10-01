import { IllegalStateError } from '@core/utils/common-errors';
import { isBlank } from '@core/utils/string-utils';

const secretKey: symbol = Symbol('secretKey');

/*
 Not exported, just as an internal part of the contract.
 Nobody can call the constructor without this interface
 being exported.
 */
interface DeleteResourceRequestData {
	[secretKey]: true; // Marker to prevent external construction
	storageKey: string;
}

export class DeleteResourceRequest {
	readonly #storageKey: string;

	public constructor(deleteResourceRequestData: DeleteResourceRequestData) {
		this.#storageKey = deleteResourceRequestData.storageKey;

		Object.freeze(this);
	}

	public getStorageKey(): string {
		return this.#storageKey;
	}
}

export class DeleteResourceRequestBuilder {
	#storageKey?: string;

	public constructor() {
		// Nothing to do so far
	}

	public getStorageKey(): string | undefined {
		return this.#storageKey;
	}

	public setStorageKey(storageKey: string | undefined): this {
		this.#storageKey = storageKey;
		return this;
	}

	#createDeleteResourceRequestData(): DeleteResourceRequestData {
		this.#validate();

		// Existence of fields relies on the validation above.
		return {
			[secretKey]: true,
			storageKey: this.#storageKey!
		};
	}

	#validate(): void {
		if (this.#storageKey === undefined || isBlank(this.#storageKey)) {
			throw new IllegalStateError('Invalid storage key!');
		}
	}

	public build(): DeleteResourceRequest {
		return new DeleteResourceRequest(this.#createDeleteResourceRequestData());
	}
}
