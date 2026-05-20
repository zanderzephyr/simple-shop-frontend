import { User, UserBuilder, UserType } from '@app/core/api/user/model/user';
import { signal, Signal, Injectable, WritableSignal } from '@angular/core';

let INSTANCE: UserService | null = null;

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    if (!INSTANCE) {
      INSTANCE = new ApiUserService();
    }
    return INSTANCE;
  },
})
export abstract class UserService {
  public abstract addUser(user: User): void;

  public abstract getUsers(): Signal<readonly User[]>;

  /**
   * Retrieves a user with ID of userId from the user
   * service if such a user exists.
   *
   * @returns The user with ID userId or null if such a
   * user doesn't exist.
   */
  public abstract getUser(userId: number): User | null;

  public abstract modifyUser(user: User): void;

  public abstract removeUser(user: User): void;
}

@Injectable() // Necessary for future dependency injection, even if this class is never directly injected.
class ApiUserService extends UserService {
  readonly #items: WritableSignal<readonly User[]> = signal(
    Object.freeze(new UserGenerator().createUsers()),
  );

  readonly #itemsPublic: Signal<readonly User[]> = this.#items.asReadonly();

  constructor() {
    if (INSTANCE) {
      throw new Error(
        'Instantiation failed: ' +
          ApiUserService.name +
          ' is a singleton managed by the framework. Manual creation or re-providing is forbidden.',
      );
    } else {
      super();
    }
  }

  public addUser(user: User): void {
    // TODO
    console.log('Adding users not yet implemented!');
  }

  // TODO replace with actual request and response processing.
  public getUsers(): Signal<readonly User[]> {
    return this.#itemsPublic;
  }

  public getUser(userId: number): User | null {
    return this.#itemsPublic().find((user) => user.getId() === userId) ?? null;
  }

  public modifyUser(user: User): void {
    // TODO
    console.log('Modifying users not yet implemented!');
  }

  public removeUser(user: User): void {
    // TODO
    console.log('Removing users not yet implemented!');
  }
}

// Just needed until we have a proper service
class UserGenerator {
  static #currentUserId: number = 0;

  public createUsers(): User[] {
    const users: User[] = [];

    // TODO

    return users;
  }
}
