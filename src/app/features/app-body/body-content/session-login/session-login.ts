import { Component, signal, inject, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { extractStringValue } from '@core/utils/input-field-utils';
import { SessionService } from '@core/api/session/session.service';
import { LoginCredentials } from '@core/api/session/model/login-credentials';
import { IllegalArgumentError } from '@core/utils/common-errors';

@Component({
  selector: 'app-session-login',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './session-login.html',
  styleUrl: './session-login.css',
})
export class SessionLoginComponent {
  readonly #sessionService: SessionService = inject(SessionService);
  readonly #defaultValue: string = '';
  protected username: WritableSignal<string> = signal('');
  protected password: WritableSignal<string> = signal('');

  constructor() {
    // Nothing to do so far
  }

  protected updateUsername(event: Event): void {
    const stringValue: string | null = extractStringValue(event);
    this.username.set(stringValue ?? this.#defaultValue);
  }

  protected updatePassword(event: Event): void {
    const stringValue: string | null = extractStringValue(event);
    this.password.set(stringValue ?? this.#defaultValue);
  }

  protected discard(): void {
    this.password.set(this.#defaultValue);
    this.username.set(this.#defaultValue);
  }

  protected async login(): Promise<void> {
    const username: string = this.username();
    const password: string = this.password();

    const loginCredentials: LoginCredentials = new LoginCredentials(username, password);
    await this.#sessionService.login(loginCredentials);

    try {
      throw new IllegalArgumentError('bla');
    } catch (e) {
      // In the if block, the compiler automatically knows the corret type now - no cast necessary.
      if (e instanceof IllegalArgumentError) {
        console.log(e.name);
        console.log(e.message);
        console.log(e.stack);
      }
    }

    // TODO What now? Redirect again?
  }
}
