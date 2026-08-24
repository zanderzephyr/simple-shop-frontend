import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, LoginRequestBuilder } from '@core/api/auth/model/login-request';
import { generateSha256Hash } from '@core/utils/crypto-utils';
import { SessionService } from '@core/session/session-service';
import { DialogService, openErrorDialog } from '@core/ui/dialog/interface/dialog-service';

interface LoginFormShape {
  username: string | null;
  password: string | null;
}

@Component({
  selector: 'app-session-login',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './session-login.html',
  styleUrl: './session-login.scss',
})
export class SessionLoginComponent {
  readonly #router: Router = inject(Router);
  readonly #sessionService: SessionService = inject(SessionService);
  readonly #dialogService = inject(DialogService);
  readonly #formBuilder: FormBuilder = inject(FormBuilder);

  protected readonly loginForm = this.#formBuilder.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
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
        this.#router.navigate(['/welcome']);
      } else {
        openErrorDialog(this.#dialogService, 'Login failed!');
      }
    }
  }
}
