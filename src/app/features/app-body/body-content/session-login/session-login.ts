import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from '@app/core/api/auth/auth.service';
import { LoginRequest } from '@app/core/api/auth/model/login-request';
import { Router } from '@angular/router';

interface LoginFormShape {
  username: string | null;
  password: string | null;
}

@Component({
  selector: 'app-session-login',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './session-login.html',
  styleUrl: './session-login.css',
})
export class SessionLoginComponent {
  readonly #router: Router = inject(Router);
  readonly #sessionService: AuthService = inject(AuthService);
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
      const loginCredentials: LoginRequest = new LoginRequest(username!, password!);

      // TODO Catch error and show validation results at the input fields
      await this.#sessionService.login(loginCredentials);

      this.#router.navigate(['/welcome']);
    }
  }
}
