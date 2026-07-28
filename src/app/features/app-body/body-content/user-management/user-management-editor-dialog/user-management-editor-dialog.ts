import { Component, Signal, WritableSignal, signal, inject } from '@angular/core';
import { UserType, compareUserTypes } from '@api/user/model/user-type';
import { User, UserBuilder } from '@api/user/model/user';
import { UserManagementEditorDialogData } from './user-management-editor-dialog-data';
import { GeneralDialogContentComponent } from '@ui/dialog/general-dialog/general-dialog-content';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InvalidStateError } from '@core/utils/common-errors';
import { generateSha256Hash } from '@core/utils/crypto-utils';

interface UserShape {
  username: string | null;
  firstName: string | null;
  middleNames: string | null;
  lastName: string | null;
  email: string | null;
  userType: UserType | null;
  password: string | null;
  passwordConfirmation: string | null;
}

@Component({
  selector: 'app-user-management-editor-dialog',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './user-management-editor-dialog.html',
  styleUrl: './user-management-editor-dialog.css',
})
export class UserManagementEditorDialogComponent extends GeneralDialogContentComponent<
  UserManagementEditorDialogData,
  User
> {
  protected readonly userTypes: Signal<readonly UserType[]> = signal(
    Object.freeze(Object.values(UserType)),
  ).asReadonly();

  readonly #formBuilder: FormBuilder = inject(FormBuilder);

  readonly #initialUser: User | undefined = this.getDialogData().getUser();

  protected readonly userForm = this.#formBuilder.group({
    username: [
      this.#initialUser?.getUsername() ?? null,
      [Validators.required, Validators.maxLength(30)],
    ],
    firstName: [
      this.#initialUser?.getFirstName() ?? null,
      [Validators.required, Validators.maxLength(30)],
    ],
    middleNames: [
      this.#initialUser?.getMiddleNames()?.join(' ') ?? null,
      [Validators.maxLength(100)],
    ],
    lastName: [
      this.#initialUser?.getLastName() ?? null,
      [Validators.required, Validators.maxLength(30)],
    ],
    email: [
      this.#initialUser?.getEmail() ?? null,
      [Validators.required, Validators.maxLength(254), Validators.email],
    ],
    userType: [this.#initialUser?.getUserType() ?? null, [Validators.required]],
    password: [null, this.#initialUser ? [] : [Validators.required]],
    passwordConfirmation: [null, this.#initialUser ? [] : [Validators.required]],
  });

  protected readonly isSubmitted: WritableSignal<boolean> = signal(false);

  protected readonly compareUserTypes: (o1: UserType | null, o2: UserType | null) => boolean =
    compareUserTypes;

  constructor() {
    super();
  }

  // TODO Not called currently. Add a button for that or remove this method.
  protected discard(formDirective: FormGroupDirective): void {
    this.isSubmitted.set(false);
    formDirective.resetForm({
      username: this.#initialUser?.getUsername() ?? null,
      firstName: this.#initialUser?.getFirstName() ?? null,
      middleNames: this.#initialUser?.getMiddleNames()?.join(' ') ?? null,
      lastName: this.#initialUser?.getLastName() ?? null,
      email: this.#initialUser?.getEmail() ?? null,
      userType: this.#initialUser?.getUserType() ?? null,
      password: null,
      passwordConfirmation: null,
    });
  }

  protected override onConfirm(): void {
    this.isSubmitted.set(true);

    this.userForm.markAllAsTouched();

    if (this.userForm.valid) {
      const userShape: UserShape = this.userForm.getRawValue();
      this.setResult(this.#createUser(userShape));
      super.onConfirm();
    }
  }

  #createUser(userShape: UserShape): User {
    const userBuilder: UserBuilder = new UserBuilder() //
      .setUsername(userShape.username!) //
      .setFirstName(userShape.firstName!) //
      .setMiddleNames(userShape.middleNames ? userShape.middleNames.trim().split(' ') : undefined) //
      .setLastName(userShape.lastName!) //
      .setEmail(userShape.email!) //
      .setUserType(userShape.userType!) //
      .setPasswordHash(this.#generatePasswordHash(userShape.password));

    if (this.#initialUser) {
      userBuilder.setId(this.#initialUser.getId()!);
      userBuilder.setVersion(this.#initialUser.getVersion()!);
    }

    return userBuilder.build();
  }

  #generatePasswordHash(formPassword: string | null): string | undefined {
    let passwordHash: string | undefined = undefined;

    if (formPassword !== null) {
      passwordHash = generateSha256Hash(formPassword);
    }

    return passwordHash;
  }

  protected override onCancel(): void {
    this.setResult(undefined);

    super.onCancel();
  }
}
