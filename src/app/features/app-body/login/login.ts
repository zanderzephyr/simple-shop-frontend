import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginRequest, LoginRequestBuilder } from '@api/auth/model/login-request';
import { LocalizationService } from '@core/localization/localization-service';
import { SessionService } from '@core/session/session-service';
import { DialogService, openErrorDialog } from '@ui/dialog/interface/dialog-service';
import { generateSha256Hash } from '@core/utils/crypto-utils';
import * as Keys from './login-utils';

interface LoginFormShape {
	username: string | null;
	password: string | null;
}

@Component({
	selector: 'app-login',
	imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
	templateUrl: './login.html',
	styleUrl: './login.scss'
})
export class LoginComponent {
	readonly #router: Router = inject(Router);
	readonly #sessionService: SessionService = inject(SessionService);
	readonly #dialogService = inject(DialogService);
	readonly #formBuilder: FormBuilder = inject(FormBuilder);

	readonly #localizationService: LocalizationService = inject(LocalizationService);
	protected readonly discardText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.DISCARD_FIELD_KEY));
	protected readonly loginText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.LOGIN_FIELD_KEY));
	readonly #loginFailedText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.LOGIN_FAILED_KEY));
	protected readonly passwordText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.PASSWORD_FIELD_KEY));
	protected readonly passwordErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.PASSWORD_FIELD_ERROR_KEY));
	protected readonly usernameText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.USERNAME_FIELD_KEY));
	protected readonly usernameErrorText: Signal<string> = computed(() => this.#localizationService.getValue(Keys.USERNAME_FIELD_ERROR_KEY));

	protected readonly loginForm = this.#formBuilder.group({
		username: [null, [Validators.required]],
		password: [null, [Validators.required]]
	});

	protected readonly isSubmitted: WritableSignal<boolean> = signal(false);

	constructor() {
		// Nothing to do so far
	}

	protected discard(formDirective: FormGroupDirective): void {
		this.isSubmitted.set(false);
		formDirective.resetForm();
	}

	protected async login(): Promise<void> {
		this.isSubmitted.set(true);

		this.loginForm.markAllAsTouched();

		if (this.loginForm.valid) {
			const { username, password }: LoginFormShape = this.loginForm.getRawValue();
			const loginCredentials: LoginRequest = new LoginRequestBuilder() //
				.setUsername(username!.trim()) //
				.setPasswordHash(generateSha256Hash(password!.trim())) //
				.build();

			const loginSuccessful: boolean = await this.#sessionService.login(loginCredentials);
			if (loginSuccessful) {
				void this.#router.navigate(['/']);
			} else {
				openErrorDialog(this.#dialogService, this.#loginFailedText());
			}
		}
	}
}
