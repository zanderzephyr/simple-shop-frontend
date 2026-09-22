import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forwardRef, inject, Injectable } from '@angular/core';
import { executeApiCall, UnauthorizedError } from '@core/utils/api-errors';
import { Observable } from 'rxjs';
import { LoginRequestSerializer } from './auth-serializer';
import { CurrentUserDto } from './dto/current-user-dto';
import { LoginResponseDto } from './dto/login-response-dto';
import { CurrentUser, zodCurrentUser } from './model/current-user';
import { LoginRequest } from './model/login-request';
import { LoginResponse, zodLoginResponse } from './model/login-response';

@Injectable({
	providedIn: 'root',
	useClass: forwardRef(() => ApiAuthService)
})
export abstract class AuthService {
	protected constructor() {
	}

	/**
	 * Logs in.
	 *
	 * @returns The login response.
	 */
	public abstract login(loginRequest: LoginRequest): Promise<LoginResponse>;

	/**
	 * Logs out.
	 */
	public abstract logout(): Promise<void>;

	/**
	 * Requests the currently logged-in user.
	 *
	 * @returns The currently logged-in user (its ID). The ID is undefined
	 * if there is no currently logged-in user.
	 */
	public abstract getCurrentUser(): Promise<CurrentUser>;
}

@Injectable() // Necessary for future dependency injection, even if this class is never directly injected.
class ApiAuthService extends AuthService {
	readonly #url = '/api/auth/v1/user';

	readonly #httpClient = inject(HttpClient);

	constructor() {
		super();
	}

	public override async login(loginRequest: LoginRequest): Promise<LoginResponse> {
		const url: string = this.#url + '/login';
		const body: string = LoginRequestSerializer.serialize(loginRequest);
		const headers: HttpHeaders = this.#createHeaders();
		const options = { headers };

		const loginResponseStream$: Observable<LoginResponseDto> =
			this.#httpClient.post<LoginResponseDto>(url, body, options);
		const loginResponseDto: LoginResponseDto = await executeApiCall(loginResponseStream$);
		return zodLoginResponse().parse(loginResponseDto);
	}

	public override async logout(): Promise<void> {
		const url: string = this.#url + '/logout';
		const headers: HttpHeaders = this.#createHeaders();
		const options = { headers };

		const logoutResponseStream$: Observable<unknown> = this.#httpClient.post(url, options);
		try {
			await executeApiCall(logoutResponseStream$);
		} catch (error: unknown) {
			/*
			 *	If the request was unauthorized, the user was already unauthenticated on the backend.
			 *	Ignore it quietly so it doesn't crash the frontend application startup sequence.
			 */
			if (!(error instanceof UnauthorizedError)) {
				throw error;
			}
		}
	}

	public override async getCurrentUser(): Promise<CurrentUser> {
		const url: string = this.#url + '/me';
		const headers: HttpHeaders = this.#createHeaders();
		const options = { headers };

		const currentUserIdStream$: Observable<CurrentUserDto> = this.#httpClient.get<CurrentUserDto>(
			url,
			options
		);

		let currentUser: CurrentUserDto = await executeApiCall(currentUserIdStream$);

		return zodCurrentUser().parse(currentUser);
	}

	#createHeaders(): HttpHeaders {
		return new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
	}
}
