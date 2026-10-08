import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDto } from '@api/user/dto/user-dto';
import { User, zodUser } from '@api/user/model/user';
import { UserType } from '@api/user/model/user-type';
import { UserSerializer } from '@api/user/serializer/user-serializer';
import { UserService } from '@api/user/user-service';
import { executeApiCall, ObjectNotFoundError } from '@core/utils/api-errors';
import { IllegalArgumentError } from '@core/utils/common-errors';
import { convertStringToEnum } from '@core/utils/data-type-utils';
import { Page, PageDto, zodPage } from '@core/utils/page/page';
import { PageConfig } from '@core/utils/page/page-config';
import { Observable } from 'rxjs';

// TODO Deal with errors when communicating with the backend.
@Injectable()
export class ApiUserService extends UserService {
	readonly #url = '/api/users/v1/regular';

	readonly #httpClient = inject(HttpClient);

	constructor() {
		super();
	}

	public override async createUser(user: User): Promise<User> {
		const url: string = this.#url + '/create-user';
		const body: string = UserSerializer.serialize(user);
		const headers: HttpHeaders = this.#createHeaders();
		const options = { headers };

		const userStream$: Observable<UserDto> = this.#httpClient.post<UserDto>(url, body, options);
		const userDto: UserDto = await executeApiCall(userStream$);
		return zodUser().parse(userDto);
	}

	public override async getUserById(userId: bigint): Promise<User> {
		const url: string = this.#url + '/get-user/' + userId.toString();
		const userStream$: Observable<UserDto> = this.#httpClient.get<UserDto>(url);
		const userDto: UserDto = await executeApiCall(userStream$);
		return zodUser().parse(userDto);
	}

	public override async getUsers(pageConfig: PageConfig): Promise<Page<User>> {
		const url: string = this.#url + '/get-users';
		const params: HttpParams = new HttpParams()
			.set('pageIndex', pageConfig.getPageIndex().toString())
			.set('pageSize', pageConfig.getPageSize().toString());
		const options = { params };

		const pageStream$: Observable<PageDto<UserDto>> = this.#httpClient.get<PageDto<UserDto>>(
			url,
			options
		);
		const pageDto: PageDto<UserDto> = await executeApiCall(pageStream$);

		return zodPage(zodUser()).parse(pageDto);
	}

	public override async getUserType(userId: bigint): Promise<UserType> {
		const url: string = this.#url + '/get-user-type/' + userId.toString();
		const options = { responseType: 'text' as const };
		const userTypeStream$: Observable<string> = this.#httpClient.get(url, options);
		const userType: string = await executeApiCall(userTypeStream$);
		return convertStringToEnum(userType, UserType)!;
	}

	public override async modifyUser(user: User): Promise<User> {
		const body: string = UserSerializer.serialize(user);
		const userId: bigint | undefined = user.getId();
		if (userId === undefined) {
			throw new IllegalArgumentError('User ID is undefined. Cannot modify user without ID.');
		}
		const url: string = this.#url + '/modify-user/' + userId.toString();
		const headers: HttpHeaders = this.#createHeaders();
		const options = { headers };

		const userStream$: Observable<UserDto> = this.#httpClient.put<UserDto>(url, body, options);
		const userDto: UserDto = await executeApiCall(userStream$);
		return zodUser().parse(userDto);
	}

	public override async deleteUser(user: User): Promise<void> {
		const userId: bigint | undefined = user.getId();
		if (userId === undefined) {
			throw new IllegalArgumentError('User ID is undefined. Cannot delete user without ID.');
		}

		const url: string = this.#url + '/delete-user/' + userId.toString();
		try {
			const resultStream$: Observable<unknown> = this.#httpClient.delete(url);
			await executeApiCall(resultStream$);
		} catch (error: unknown) {
			if (!(error instanceof ObjectNotFoundError)) {
				throw error;
			}
		}
	}

	#createHeaders(): HttpHeaders {
		return new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
	}
}
