import { IllegalStateError } from '@core/utils/common-errors';
import { isBlank } from '@core/utils/string-utils';
import { ZodType } from 'zod';
import { LoginResponseDto, zodLoginResponseDto } from '../dto/login-response-dto';

const secretKey: symbol = Symbol('secretKey');

interface LoginResponseData {
	[secretKey]: true; // Marker to prevent external construction
	credentialsOk: boolean;
	userId?: bigint;
	errorMessage?: string;
}

export class LoginResponse {
	readonly #credentialsOk: boolean;
	readonly #userId?: bigint;
	readonly #errorMessage?: string;

	constructor(loginResponseData: LoginResponseData) {
		this.#credentialsOk = loginResponseData.credentialsOk;
		this.#userId = loginResponseData.userId;
		this.#errorMessage = loginResponseData.errorMessage;

		Object.freeze(this);
	}

	public getCredentialsOk(): boolean {
		return this.#credentialsOk;
	}

	public getUserId(): bigint | undefined {
		return this.#userId;
	}

	public getErrorMessage(): string | undefined {
		return this.#errorMessage;
	}
}

export class LoginResponseBuilder {
	#credentialsOk?: boolean;
	#userId?: bigint;
	#errorMessage?: string;

	constructor() {
		// Nothing to do so far
	}

	public getCredentialsOk(): boolean | undefined {
		return this.#credentialsOk;
	}

	public setCredentialsOk(credentialsOk: boolean | undefined): LoginResponseBuilder {
		this.#credentialsOk = credentialsOk;
		return this;
	}

	public getUserId(): bigint | undefined {
		return this.#userId;
	}

	public setUserId(userId: bigint | undefined): LoginResponseBuilder {
		this.#userId = userId;
		return this;
	}

	public getErrorMessage(): string | undefined {
		return this.#errorMessage;
	}

	public setErrorMessage(errorMessage: string | undefined): LoginResponseBuilder {
		this.#errorMessage = errorMessage;
		return this;
	}

	#createLoginResponseData(): LoginResponseData {
		this.#validate();

		// Existence of fields relies on the validation above.
		return {
			[secretKey]: true,
			credentialsOk: this.#credentialsOk!,
			userId: this.#userId,
			errorMessage: this.#errorMessage
		};
	}

	#validate(): void {
		if (this.#credentialsOk === undefined) {
			throw new IllegalStateError('Invalid credentials ok!');
		}

		if (this.#userId !== undefined && this.#userId < 0n) {
			throw new IllegalStateError('Invalid user ID!');
		}

		if (this.#errorMessage !== undefined && isBlank(this.#errorMessage)) {
			throw new IllegalStateError('Invalid error message!');
		}
	}

	public build(): LoginResponse {
		return new LoginResponse(this.#createLoginResponseData());
	}
}

export function zodLoginResponse(): ZodType<LoginResponse> {
	return zodLoginResponseDto().transform((dto: LoginResponseDto): LoginResponse => {
		return new LoginResponseBuilder()
			.setCredentialsOk(dto.credentialsOk)
			.setUserId(dto.userId ? BigInt(dto.userId) : undefined)
			.setErrorMessage(dto.errorMessage)
			.build();
	});
}
