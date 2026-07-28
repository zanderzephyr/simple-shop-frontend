import { zodUser, User } from '@api/user/model/user';
import { UserDto } from '@api/user/model/user-dto';
import { inject, forwardRef, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PageConfig } from '@core/utils/page/page-config';
import { Page, PageDto, zodPage } from '@core/utils/page/page';
import { UserSerializer } from './user-serializer';
import { Observable, firstValueFrom } from 'rxjs';
import { IllegalArgumentError } from '@core/utils/common-errors';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => ApiUserService),
})
export abstract class UserService {
  public constructor() {}

  /**
   * Adds a new user and returns the created user.
   *
   * The backend will set the technical properties of the user (e.g. the ID field)
   * and return the created user.
   *
   * @returns The user created by the backend.
   */
  // TODO Document
  public abstract createUser(user: User): Promise<User>;

  /**
   * Requests a user by its ID from the backend.
   *
   * @returns The requested user or null if not found.
   */
  // TODO Document
  public abstract getUserById(id: bigint): Promise<User | null>;

  /**
   * Requests user based on the provided page configuration.
   *
   * @returns The list of requested users.
   */
  // TODO Document
  public abstract getUsers(pageConfig: PageConfig): Promise<Page<User>>;

  /**
   * Changes a user.
   *
   * @returns The modified user.
   */
  // TODO Document
  public abstract modifyUser(user: User): Promise<User>;

  /**
   * Removes a user in the backend.
   */
  // TODO Document
  public abstract deleteUser(user: User): Promise<void>;
}

@Injectable() // Necessary for future dependency injection, even if this class is never directly injected.
class ApiUserService extends UserService {
  readonly #url = '/api/v1/users';

  readonly #httpClient = inject(HttpClient);

  constructor() {
    super();
  }

  public override async createUser(user: User): Promise<User> {
    const body: string = UserSerializer.serialize(user);
    const headers: HttpHeaders = this.#createHeaders();
    const options = { headers };

    const userStream$: Observable<UserDto> = this.#httpClient.post<UserDto>(
      this.#url,
      body,
      options,
    );
    const userDto: UserDto = await firstValueFrom(userStream$);
    return zodUser().parse(userDto);
  }

  public override async getUserById(userId: bigint): Promise<User | null> {
    const url: string = this.#url + '/' + userId.toString();
    const userStream$: Observable<UserDto> = this.#httpClient.get<UserDto>(url);
    const userDto: UserDto = await firstValueFrom(userStream$);
    return zodUser().parse(userDto);
  }

  public override async getUsers(pageConfig: PageConfig): Promise<Page<User>> {
    const params: HttpParams = new HttpParams()
      .set('pageIndex', pageConfig.getPageIndex().toString())
      .set('pageSize', pageConfig.getPageSize().toString());
    const options = { params };

    const pageStream$: Observable<PageDto<UserDto>> = this.#httpClient.get<PageDto<UserDto>>(
      this.#url,
      options,
    );
    const pageDto: PageDto<UserDto> = await firstValueFrom(pageStream$);

    return zodPage(zodUser()).parse(pageDto);
  }

  public override async modifyUser(user: User): Promise<User> {
    const body: string = UserSerializer.serialize(user);
    const userId: bigint | undefined = user.getId();
    if (userId === undefined) {
      throw new IllegalArgumentError('User ID is undefined. Cannot modify user without ID.');
    }
    const headers: HttpHeaders = this.#createHeaders();
    const options = { headers };
    const url: string = this.#url + '/' + userId.toString();

    const userStream$: Observable<UserDto> = this.#httpClient.put<UserDto>(url, body, options);
    const userDto: UserDto = await firstValueFrom(userStream$);
    return zodUser().parse(userDto);
  }

  /*
			Do not throw in that method, if the user doesn't exist anymore.
			The current client might try to delete a user, that another client already removed.
		 */
  public override async deleteUser(user: User): Promise<void> {
    const userId: bigint | undefined = user.getId();
    if (userId === undefined) {
      throw new IllegalArgumentError('User ID is undefined. Cannot delete user without ID.');
    }

    const url: string = this.#url + '/' + userId.toString();
    const resultStream$: Observable<unknown> = this.#httpClient.delete(url);
    await firstValueFrom(resultStream$);
  }

  #createHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }
}
