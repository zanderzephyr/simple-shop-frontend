import { Component, inject, signal, WritableSignal, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
  AbstractControl,
} from '@angular/forms';
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

  readonly #formTrigger: Signal<unknown> = toSignal(
    // Create a single observable out of multiple observables
    merge(
      // Emits an event whenever the form's validity flips (e.g., changing from INVALID to VALID)
      this.loginForm.statusChanges,
      // Emits an event every single time a user types a character or updates a field value
      this.loginForm.valueChanges,
    ),
    /*
			Just set any value for that signal. We don't use that signal's value at all,
     	but only use the signal changes as a trigger.
		*/
    { initialValue: null },
  );

  protected isUsernameFieldInvalid: Signal<boolean> = computed(() => {
    return this.#isFieldInvalid('username');
  });

  protected isPasswordFieldInvalid: Signal<boolean> = computed(() => {
    return this.#isFieldInvalid('password');
  });

  constructor() {
    // Nothing to do so far
  }

  #isFieldInvalid(fieldName: string): boolean {
    // Establish reactive tracking dependency - we don't care for the value of the signal, just for its trigger moments.
    this.#formTrigger();

    const field: AbstractControl<unknown, unknown, unknown> | null = this.loginForm.get(fieldName);
    if (field?.invalid && (field?.touched || this.isSubmitted())) {
      return true;
    }
    return false;
  }

  protected discard(formDirective: FormGroupDirective): void {
    this.isSubmitted.set(false);
    formDirective.resetForm();
  }

  protected async login(): Promise<void> {
    this.isSubmitted.set(true);

    if (this.loginForm.valid) {
      const { username, password }: LoginFormShape = this.loginForm.getRawValue();
      const loginCredentials: LoginCredentials = new LoginCredentials(username, password);

      // TODO Catch error and show validation results at the input fields
      await this.#sessionService.login(loginCredentials);

      this.#router.navigate(['/welcome']);
    }
  }
}
