import { User, UserBuilder, UserType } from '@api/user/model/user';
import { forwardRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => ApiUserService),
})
export abstract class UserService {
  public constructor() {}

  // TODO Document and reconsider return value
  public abstract createUser(user: User): Promise<void>;

  // TODO Document and reconsider return value
  public abstract getUsers(): Promise<readonly User[]>;

  /**
   * Retrieves a user with ID of userId from the user
   * service if such a user exists.
   *
   * @returns The user with ID userId or null if such a
   * user doesn't exist.
   */
  public abstract getUser(userId: number): Promise<User | null>;

  // TODO Document and reconsider return value
  public abstract modifyUser(user: User): Promise<void>;

  // TODO Document and reconsider return value
  public abstract deleteUser(user: User): Promise<void>;
}

@Injectable() // Necessary for future dependency injection, even if this class is never directly injected.
class ApiUserService extends UserService {
  readonly #users: readonly User[] = Object.freeze(new UserGenerator().createUsers());

  constructor() {
    super();
  }

  public override async createUser(user: User): Promise<void> {
    // TODO
    console.log('Adding users not yet implemented!');
  }

  // TODO replace with actual request and response processing.
  public override async getUsers(): Promise<readonly User[]> {
    return this.#users;
  }

  public override async getUser(userId: number): Promise<User | null> {
    return this.#users.find((user) => user.getId() === userId) ?? null;
  }

  public override async modifyUser(user: User): Promise<void> {
    // TODO
    console.log('Modifying users not yet implemented!');
  }

  public override async deleteUser(user: User): Promise<void> {
    // TODO
    console.log('Deleting users not yet implemented!');
  }
}

// Just needed until we have a proper service
class UserGenerator {
  static #currentUserId: number = 0;

  public createUsers(): User[] {
    const users: User[] = [];

    users.push(
      new UserBuilder()
        .setId(UserGenerator.#currentUserId++)
        .setUsername('Horst')
        .setUserType(UserType.ADMIN)
        .build(),
    );

    users.push(
      new UserBuilder()
        .setId(UserGenerator.#currentUserId++)
        .setUsername('Hannes')
        .setUserType(UserType.CUSTOMER)
        .build(),
    );

    return users;
  }
}
