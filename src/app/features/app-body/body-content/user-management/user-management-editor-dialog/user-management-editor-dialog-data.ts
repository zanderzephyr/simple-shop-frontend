import { GeneralDialogData } from '@ui/dialog/general-dialog/general-dialog-data';
import { UserManagementEditorDialogComponent } from './user-management-editor-dialog';
import { User } from '@api/user/model/user';

export class UserManagementEditorDialogData extends GeneralDialogData<
  UserManagementEditorDialogData,
  User,
  UserManagementEditorDialogComponent
> {
  readonly #user: User | undefined;

  public constructor(user: User | undefined, title: string) {
    super(title, UserManagementEditorDialogComponent);

    this.#user = user;
  }

  public getUser(): User | undefined {
    return this.#user;
  }
}
