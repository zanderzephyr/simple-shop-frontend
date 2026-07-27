import { LocalDateTime } from '@js-joda/core';
import { UserType } from './user-type';
import { ZodType } from 'zod';
import { UserDto, zodUserDto, dateTimeFormatter } from './user-dto';
import { InvalidStateError } from '@core/utils/common-errors';
import { isBlank } from '@core/utils/string-utils';
import { convertStringToEnum, parseLocalDateTime } from '@core/utils/data-type-utils';

const secretKey: symbol = Symbol('secretKey');

interface UserData {
  [secretKey]: true; // Marker to prevent external construction
  id?: bigint;
  username: string;
  firstName: string;
  middleNames?: string[];
  lastName: string;
  email: string;
  userType: UserType;
  srpSalt?: string;
  srpVerifier?: string;
  lastChange?: LocalDateTime;
  lastChangedBy?: bigint;
  version?: bigint;
}

export class User {
  readonly #id?: bigint;
  readonly #username: string;
  readonly #firstName: string;
  readonly #lastName: string;
  readonly #middleNames?: string[];
  readonly #email: string;
  readonly #userType: UserType;
  readonly #srpSalt?: string;
  readonly #srpVerifier?: string;
  readonly #lastChange?: LocalDateTime;
  readonly #lastChangedBy?: bigint;
  readonly #version?: bigint;

  public constructor(userData: UserData) {
    this.#id = userData.id;
    this.#username = userData.username;
    this.#firstName = userData.firstName;
    this.#middleNames = userData.middleNames ? [...userData.middleNames] : undefined;
    this.#lastName = userData.lastName;
    this.#email = userData.email;
    this.#userType = userData.userType;
    this.#srpSalt = userData.srpSalt;
    this.#srpVerifier = userData.srpVerifier;
    this.#lastChange = userData.lastChange;
    this.#lastChangedBy = userData.lastChangedBy;
    this.#version = userData.version;

    Object.freeze(this);
  }

  public getId(): bigint | undefined {
    return this.#id;
  }

  public getUsername(): string {
    return this.#username;
  }

  public getFirstName(): string {
    return this.#firstName;
  }

  public getMiddleNames(): readonly string[] | undefined {
    return Object.freeze(this.#middleNames);
  }

  public getLastName(): string {
    return this.#lastName;
  }

  public getEmail(): string {
    return this.#email;
  }

  public getUserType(): UserType {
    return this.#userType;
  }

  public getSrpSalt(): string | undefined {
    return this.#srpSalt;
  }

  public getSrpVerifier(): string | undefined {
    return this.#srpVerifier;
  }

  public getLastChange(): LocalDateTime | undefined {
    return this.#lastChange;
  }

  public getLastChangedBy(): bigint | undefined {
    return this.#lastChangedBy;
  }

  public getVersion(): bigint | undefined {
    return this.#version;
  }
}

export class UserBuilder {
  /**
   * Is only to be set by the user service.
   */
  #id?: bigint;
  #username?: string;
  #firstName?: string;
  #middleNames?: string[];
  #lastName?: string;
  #email?: string;
  #userType?: UserType;
  #srpSalt?: string;
  #srpVerifier?: string;
  /**
   * Is only to be set by the user service.
   */
  #lastChange?: LocalDateTime;
  /**
   * Is only to be set by the user service.
   */
  #lastChangedBy?: bigint;
  /**
   * Is only to be set by the user service.
   */
  #version?: bigint;

  public constructor() {
    // Nothing to do so far
  }

  public getId(): bigint | undefined {
    return this.#id;
  }

  public setId(id: bigint): this {
    this.#id = id;
    return this;
  }

  public getUsername(): string | undefined {
    return this.#username;
  }

  public setUsername(username: string | undefined): this {
    this.#username = username;
    return this;
  }

  public getFirstName(): string | undefined {
    return this.#firstName;
  }

  public setFirstName(firstName: string | undefined): this {
    this.#username = firstName;
    return this;
  }

  public getMiddleNames(): string[] | undefined {
    return this.#middleNames;
  }

  public setMiddleNames(middleNames: string[] | undefined): this {
    this.#middleNames = middleNames ? [...middleNames] : undefined;
    return this;
  }

  public getLastName(): string | undefined {
    return this.#lastName;
  }

  public setLastName(lastName: string | undefined): this {
    this.#lastName = lastName;
    return this;
  }

  public getEmail(): string | undefined {
    return this.#email;
  }

  public setEmail(email: string | undefined): this {
    this.#email = email;
    return this;
  }

  public getUserType(): UserType | undefined {
    return this.#userType;
  }

  public setUserType(userType: UserType | undefined): this {
    this.#userType = userType;
    return this;
  }

  public getSrpSalt(): string | undefined {
    return this.#srpSalt;
  }

  public setSrpSalt(srpSalt: string | undefined): this {
    this.#srpSalt = srpSalt;
    return this;
  }

  public getSrpVerifier(): string | undefined {
    return this.#srpVerifier;
  }

  public setSrpVerifier(srpVerifier: string | undefined): this {
    this.#srpVerifier = srpVerifier;
    return this;
  }

  public getLastChange(): LocalDateTime | undefined {
    return this.#lastChange;
  }

  public setLastChange(lastChange: LocalDateTime | undefined): this {
    this.#lastChange = lastChange;
    return this;
  }

  public getLastChangedBy(): bigint | undefined {
    return this.#lastChangedBy;
  }

  public setLastChangedBy(lastChangedBy: bigint | undefined): this {
    this.#lastChangedBy = lastChangedBy;
    return this;
  }

  public getVersion(): bigint | undefined {
    return this.#version;
  }

  public setVersion(version: bigint | undefined): this {
    this.#version = version;
    return this;
  }

  #createUserData(): UserData {
    this.#validate();

    // Existence of fields relies on the validation above.
    return {
      [secretKey]: true,
      id: this.#id,
      username: this.#username!,
      firstName: this.#firstName!,
      middleNames: this.#middleNames,
      lastName: this.#lastName!,
      email: this.#email!,
      userType: this.#userType!,
      srpSalt: this.#srpSalt,
      srpVerifier: this.#srpVerifier,
      lastChange: this.#lastChange,
      lastChangedBy: this.#lastChangedBy,
      version: this.#version,
    };
  }

  #validate(): void {
    if (this.#id !== undefined && this.#id < 0n) {
      throw new InvalidStateError('Invalid item ID!');
    }

    if (this.#username === undefined || isBlank(this.#username)) {
      throw new InvalidStateError('No username!');
    }

    if (this.#firstName === undefined || isBlank(this.#firstName)) {
      throw new InvalidStateError('No first name!');
    }

    if (this.#lastName === undefined || isBlank(this.#lastName)) {
      throw new InvalidStateError('No last name!');
    }

    if (this.#email === undefined || isBlank(this.#email)) {
      throw new InvalidStateError('No email!');
    }

    if (this.#userType === undefined) {
      throw new InvalidStateError('No user type!');
    }

    if (this.#lastChangedBy !== undefined && this.#lastChangedBy < 0n) {
      throw new InvalidStateError('Invalid last changed by!');
    }

    if (this.#version !== undefined && this.#version < 0n) {
      throw new InvalidStateError('Invalid version!');
    }
  }

  public build(): User {
    return new User(this.#createUserData());
  }
}

export function zodUser(): ZodType<User> {
  return zodUserDto().transform((dto: UserDto): User => {
    return new UserBuilder()
      .setId(BigInt(dto.id!))
      .setUsername(dto.username)
      .setFirstName(dto.firstName)
      .setMiddleNames(dto.middleNames)
      .setLastName(dto.lastName)
      .setEmail(dto.email)
      .setUserType(convertStringToEnum(dto.userType, UserType)!)
      .setSrpSalt(dto.srpSalt)
      .setSrpVerifier(dto.srpVerifier)
      .setLastChange(parseLocalDateTime(dto.lastChange!, dateTimeFormatter))
      .setLastChangedBy(BigInt(dto.lastChangedBy!))
      .setVersion(BigInt(dto.version!))
      .build();
  });
}
