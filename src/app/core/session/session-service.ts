import { Injectable, Signal } from '@angular/core';
import { LoginRequest } from '@api/auth/model/login-request';
import { SessionData } from './session-data';

@Injectable()
export abstract class SessionService {
	protected constructor() {
		// Nothing to do so far
	}

	/**
	 * Attempts to log in the user with the provided login credentials.
	 * @param loginRequest The login credentials to use for authentication.
	 * @returns A promise that resolves to true if the login was successful, or false if the credentials were invalid.
	 */
	public abstract login(loginRequest: LoginRequest): Promise<boolean>;

	// TODO Document
	public abstract logout(): Promise<void>;

	// TODO Document
	public abstract initSession(): Promise<void>;

	// TODO Document
	public abstract getSessionData(): Signal<SessionData | undefined>;

	// TODO Document
	public abstract isLoggedIn(): Signal<boolean>;
}
