import { forwardRef, Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginRequest } from './model/login-request';
import { LoginResponse, zodLoginResponse } from './model/login-response';
import { LoginResponseDto } from './dto/login-response-dto';
import { LoginRequestSerializer } from './auth-serializer';
import { CurrentUser, zodCurrentUser } from './model/current-user';
import { CurrentUserDto } from './dto/current-user-dto';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => ApiAuthService),
})
export abstract class AuthService {
  public constructor() {}

  /**
   * Tries to log into the backend.
   */
  public abstract login(loginRequest: LoginRequest): Promise<LoginResponse>;

  // TODO Document
  public abstract logout(): Promise<void>;

  public abstract getCurrentUser(): Promise<CurrentUser | undefined>;
}

/*
 * TODO For all endpoints, work with the possible error responses from the backend.
 * For example, if the backend returns a 401 Unauthorized response, we could handle
 * that gracefully and provide a meaningful error message to the user.
 *
 * try {
 *   const loginResponse = await authService.login(loginRequest);
 *   // Handle successful login
 * } catch (error) {
 *   if (error instanceof HttpErrorResponse) {
 *	 		if (error.status === 401) {
 *     		// Handle unauthorized error
 *		  }
 *   } else {
 *     // Handle other errors
 *   }
 * }
 */
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
    const loginResponseDto: LoginResponseDto = await firstValueFrom(loginResponseStream$);
    return zodLoginResponse().parse(loginResponseDto);
  }

  public override async logout(): Promise<void> {
    const url: string = this.#url + '/logout';
    const headers: HttpHeaders = this.#createHeaders();
    const options = { headers };

    const logoutResponseStream$: Observable<unknown> = this.#httpClient.post(url, options);
    await firstValueFrom(logoutResponseStream$);
  }

  public override async getCurrentUser(): Promise<CurrentUser | undefined> {
    const url: string = this.#url + '/me';
    const headers: HttpHeaders = this.#createHeaders();
    const options = { headers };

    const currentUserIdStream$: Observable<CurrentUserDto> = this.#httpClient.get<CurrentUserDto>(
      url,
      options,
    );

    let currentUser: CurrentUserDto | undefined = undefined;
    try {
      currentUser = await firstValueFrom(currentUserIdStream$);
    } catch (error: unknown) {
      if (
        (error instanceof HttpErrorResponse && error.status !== 401) ||
        !(error instanceof HttpErrorResponse)
      ) {
        console.error('Error fetching current user:', error);
      }
    }

    return currentUser ? zodCurrentUser().parse(currentUser) : undefined;
  }

  #createHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }
}
