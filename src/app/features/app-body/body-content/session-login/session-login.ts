import { Component, inject, signal, WritableSignal, Signal, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { SessionService } from '@api/session/session.service';
import { LoginCredentials } from '@api/session/model/login-credentials';
import { Router } from '@angular/router';

interface LoginFormShape {
  username: string;
  password: string;
}

@Component({
  selector: 'app-session-login',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './session-login.html',
  styleUrl: './session-login.css',
})
export class SessionLoginComponent {
  readonly #router: Router = inject(Router);
  readonly #sessionService: SessionService = inject(SessionService);
  readonly #formBuilder: FormBuilder = inject(FormBuilder);

  protected readonly loginForm = this.#formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
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
      const loginCredentials: LoginCredentials = new LoginCredentials(username, password);

      // TODO Catch error and show validation results at the input fields
      await this.#sessionService.login(loginCredentials);

      this.#router.navigate(['/welcome']);
    }
  }
}
