import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroupDirective,
	ReactiveFormsModule,
	ValidationErrors,
	Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User, UserBuilder } from '@api/user/model/user';
import { compareUserTypes, UserType } from '@api/user/model/user-type';
import { LocalizationService } from '@core/localization/localization-service';
import { generateSha256Hash } from '@core/utils/crypto-utils';
import { isBlank } from '@core/utils/string-utils';
import { GeneralDialogContentComponent } from '@ui/dialog/general-dialog/general-dialog-content';
import { first } from 'rxjs';
import { UserManagementEditorDialogData } from './user-editor-dialog-data';
import * as Keys from './user-editor-dialog-utils';

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
	selector: 'app-user-editor-dialog',
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
	templateUrl: './user-editor-dialog.html',
	styleUrl: './user-editor-dialog.scss'
})
export class UserEditorDialogComponent extends GeneralDialogContentComponent<
	UserManagementEditorDialogData,
	User
> {
	readonly #localizationService: LocalizationService = inject(LocalizationService);
	protected readonly emailText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.EMAIL_KEY));
	protected readonly emailErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.EMAIL_ERROR_KEY));
	protected readonly firstNameText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.FIRST_NAME_KEY));
	protected readonly firstNameErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.FIRST_NAME_ERROR_KEY));
	protected readonly lastNameText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.LAST_NAME_KEY));
	protected readonly lastNameErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.LAST_NAME_ERROR_KEY));
	protected readonly middleNamesText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.MIDDLE_NAMES_KEY));
	protected readonly middleNamesErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.MIDDLE_NAMES_ERROR_KEY));
	protected readonly passwordText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.PASSWORD_KEY));
	protected readonly passwordErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.PASSWORD_ERROR_KEY));
	protected readonly passwordConfirmationText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.PASSWORD_CONFIRMATION_KEY));
	protected readonly passwordConfirmationErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.PASSWORD_CONFIRMATION_ERROR_KEY));
	protected readonly usernameText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.USERNAME_KEY));
	protected readonly usernameErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.USERNAME_ERROR_KEY));
	protected readonly userTypeText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.USER_TYPE_KEY));
	protected readonly userTypeErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.USER_TYPE_ERROR_KEY));

	protected readonly userTypes: Signal<readonly UserType[]> = signal(
		Object.freeze(Object.values(UserType))
	).asReadonly();

	readonly #formBuilder: FormBuilder = inject(FormBuilder);

	readonly #initialUser: User | undefined = this.getDialogData().getUser();

	protected readonly userForm = this.#formBuilder.group(
		{
			username: [
				this.#initialUser?.getUsername() ?? null,
				[Validators.required, Validators.maxLength(30)]
			],
			firstName: [
				this.#initialUser?.getFirstName() ?? null,
				[Validators.required, Validators.maxLength(30)]
			],
			middleNames: [
				this.#initialUser?.getMiddleNames()?.join(' ') ?? null,
				[Validators.maxLength(100)]
			],
			lastName: [
				this.#initialUser?.getLastName() ?? null,
				[Validators.required, Validators.maxLength(30)]
			],
			email: [
				this.#initialUser?.getEmail() ?? null,
				[Validators.required, Validators.maxLength(254), Validators.email]
			],
			userType: [this.#initialUser?.getUserType() ?? null, [Validators.required]],
			password: [null, this.#initialUser ? [] : [Validators.required]],
			passwordConfirmation: [null, this.#initialUser ? [] : [Validators.required]]
		},
		{
			validators: this.#validatePasswordConfirmation
		}
	);

	protected readonly isSubmitted: WritableSignal<boolean> = signal(false);

	protected readonly compareUserTypes: (o1: UserType | null, o2: UserType | null) => boolean =
		compareUserTypes;

	constructor() {
		super();
	}

	#validatePasswordConfirmation(group: AbstractControl): ValidationErrors | null {
		const passwordControl: AbstractControl | null = group.get('password');
		const password: string | undefined = passwordControl?.value;
		const passwordConfirmationControl: AbstractControl | null = group.get('passwordConfirmation');
		const passwordConfirmation: string | undefined = passwordConfirmationControl?.value;

		const currentErrors: ValidationErrors | null | undefined = passwordConfirmationControl?.errors;

		if (password !== passwordConfirmation) {
			const error = { passwordMismatch: true };
			passwordConfirmationControl?.setErrors(
				currentErrors ? { ...currentErrors, passwordMismatch: true } : error
			);
			return error;
		}

		if (currentErrors && currentErrors['passwordMismatch']) {
			delete currentErrors['passwordMismatch'];
			const remainingErrors = Object.keys(currentErrors).length > 0 ? currentErrors : null;
			passwordConfirmationControl?.setErrors(remainingErrors);
		}

		return null;
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
			passwordConfirmation: null
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
			.setUsername(userShape.username!.trim()) //
			.setFirstName(userShape.firstName!.trim()) //
			.setMiddleNames(
				userShape.middleNames && !isBlank(userShape.middleNames)
					? userShape.middleNames.trim().split(' ')
					: undefined
			) //
			.setLastName(userShape.lastName!.trim()) //
			.setEmail(userShape.email!.trim()) //
			.setUserType(userShape.userType!) //
			.setPasswordHash(
				userShape.password && !isBlank(userShape.password)
					? generateSha256Hash(userShape.password.trim())
					: undefined
			);

		if (this.#initialUser) {
			userBuilder.setId(this.#initialUser.getId()!);
			userBuilder.setVersion(this.#initialUser.getVersion()!);
		}

		return userBuilder.build();
	}

	protected override onCancel(): void {
		this.setResult(undefined);

		super.onCancel();
	}

	protected readonly first = first;
}
