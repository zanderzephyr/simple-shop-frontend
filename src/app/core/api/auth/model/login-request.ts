import { IllegalStateError } from '@core/utils/common-errors';
import { isBlank } from '@core/utils/string-utils';

const secretKey: symbol = Symbol('secretKey');

interface LoginRequestData {
	[secretKey]: true; // Marker to prevent external construction
	username: string;
	passwordHash: string;
}

export class LoginRequest {
	readonly #username: string;
	readonly #passwordHash: string;
	readonly #clientType: string;

	constructor(loginRequestData: LoginRequestData) {
		this.#username = loginRequestData.username;
		this.#passwordHash = loginRequestData.passwordHash;
		this.#clientType = 'FRONTEND';

		Object.freeze(this);
	}

	public getUsername(): string {
		return this.#username;
	}

	public getPasswordHash(): string {
		return this.#passwordHash;
	}

	public getClientType(): string {
		return this.#clientType;
	}
}

export class LoginRequestBuilder {
	#username?: string;
	#passwordHash?: string;

	constructor() {
		// Nothing to do so far
	}

	public getUsername(): string | undefined {
		return this.#username;
	}

	public setUsername(username: string | undefined): LoginRequestBuilder {
		this.#username = username;
		return this;
	}

	public getPasswordHash(): string | undefined {
		return this.#passwordHash;
	}

	public setPasswordHash(passwordHash: string | undefined): LoginRequestBuilder {
		this.#passwordHash = passwordHash;
		return this;
	}

	#createLoginCredentialsData(): LoginRequestData {
		this.#validate();

		// Existence of fields relies on the validation above.
		return {
			[secretKey]: true,
			username: this.#username!,
			passwordHash: this.#passwordHash!
		};
	}

	#validate(): void {
		if (this.#username === undefined || isBlank(this.#username)) {
			throw new IllegalStateError('Invalid username!');
		}

		if (this.#passwordHash === undefined || isBlank(this.#passwordHash)) {
			throw new IllegalStateError('Invalid password hash!');
		}
	}

	public build(): LoginRequest {
		return new LoginRequest(this.#createLoginCredentialsData());
	}
}
