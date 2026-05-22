import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { SessionService } from '@core/api/session/session.service';
import { LoginCredentials } from '@core/api/session/model/login-credentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-login',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './session-login.html',
  styleUrl: './session-login.css',
})
export class SessionLoginComponent {
  readonly #router: Router = inject(Router);
  readonly #sessionService: SessionService = inject(SessionService);
  readonly #fb: FormBuilder = inject(FormBuilder);

  protected readonly loginForm: FormGroup = this.#fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  protected isSubmitted: boolean = false;

  constructor() {
    // Nothing to do so far
  }

  protected discard(formDirective: FormGroupDirective): void {
    this.isSubmitted = false;
    formDirective.resetForm();
  }

  protected async login(): Promise<void> {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      const { username, password }: { username: string; password: string } =
        this.loginForm.getRawValue();
      const loginCredentials: LoginCredentials = new LoginCredentials(username, password);

      // TODO Catch error and show validation results at the input fields
      await this.#sessionService.login(loginCredentials);

      this.#router.navigate(['/welcome']);
    }
  }
}
