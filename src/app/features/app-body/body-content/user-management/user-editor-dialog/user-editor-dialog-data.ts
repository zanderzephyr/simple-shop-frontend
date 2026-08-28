import { GeneralDialogData } from '@ui/dialog/general-dialog/general-dialog-data';
import { UserEditorDialogComponent } from './user-editor-dialog';
import { User } from '@api/user/model/user';

export class UserManagementEditorDialogData extends GeneralDialogData<
	UserManagementEditorDialogData,
	User,
	UserEditorDialogComponent
> {
	readonly #user: User | undefined;

	public constructor(user: User | undefined, title: string) {
		super(title, UserEditorDialogComponent);

		this.#user = user;
	}

	public getUser(): User | undefined {
		return this.#user;
	}
}
