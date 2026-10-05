import { Injectable } from '@angular/core';
import { CurrentUser } from './model/current-user';
import { LoginRequest } from './model/login-request';
import { LoginResponse } from './model/login-response';

@Injectable()
export abstract class AuthService {
	protected constructor() {
		// Nothing to do so far
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
