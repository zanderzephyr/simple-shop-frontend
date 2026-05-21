import {
  Component,
  computed,
  effect,
  inject,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { Session } from '@app/core/session';
import { UserType } from '@app/core/api/user/model/user';

@Component({
  selector: 'app-sidebar-admin',
  imports: [],
  templateUrl: './sidebar-admin.html',
  styleUrl: './sidebar-admin.css',
})
export class SidebarAdminComponent {
  public readonly visibilityChange: OutputEmitterRef<boolean> = output<boolean>();

  readonly #session: Session = inject(Session);

  readonly #isVisible: Signal<boolean> = computed(
    () => this.#session.getSessionData()()?.getUserType() === UserType.ADMIN,
  );

  constructor() {
    effect(() => {
      this.visibilityChange.emit(this.#isVisible());
    });
  }
}
