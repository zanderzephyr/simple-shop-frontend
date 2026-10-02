import { Injectable } from '@angular/core';
import { User } from '@api/user/model/user';
import { Page } from '@core/utils/page/page';
import { PageConfig } from '@core/utils/page/page-config';
import { UserType } from './model/user-type';

@Injectable()
export abstract class UserService {
	protected constructor() {
	}

	/**
	 * Adds a new user and returns the created user.
	 *
	 * The backend will set the technical properties of the user (e.g. the ID field)
	 * and return the created user.
	 *
	 * @throws DuplicateObjectError if there already was a user like that.
	 *
	 * @returns The created user.
	 */
	public abstract createUser(user: User): Promise<User>;

	/**
	 * Requests a user by its ID.
	 *
	 * @throws IllegalRequestError if the requesting user didn't have enough rights to see the target user.
	 * @throws ObjectNotFoundError if the user wasn't found.
	 *
	 * @returns The requested user.
	 */
	public abstract getUserById(id: bigint): Promise<User>;

	/**
	 * Requests users based on the provided page configuration.
	 *
	 * @returns The page of requested users.
	 */
	public abstract getUsers(pageConfig: PageConfig): Promise<Page<User>>;

	/**
	 * Requests the type of a user by the ID of this user.
	 *
	 * @throws IllegalRequestError if the requesting user didn't have enough rights to see the target user.
	 * @throws ObjectNotFoundError if the user wasn't found.
	 *
	 * @returns The requested user type.
	 */
	public abstract getUserType(id: bigint): Promise<UserType>;

	/**
	 * Modifies a user.
	 *
	 * @throws DuplicateObjectError if there already was a user like that.
	 * @throws IllegalRequestError if the requesting user didn't have enough rights to modify the target user.
	 * @throws ObjectNotFoundError if the user wasn't found.
	 *
	 * @returns The modified user.
	 */
	public abstract modifyUser(user: User): Promise<User>;

	/**
	 * Deletes a user.
	 *
	 * Does not throw if the user doesn't exist anymore.
	 *
	 * @throws IllegalRequestError if the requesting user didn't have enough rights to delete the target user.
	 */
	public abstract deleteUser(user: User): Promise<void>;
}
