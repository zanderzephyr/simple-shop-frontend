export const MessageDialogResult = {
	CONFIRM: { id: 'CONFIRM' },
	CANCEL: { id: 'CANCEL' }
} as const;
type ValueOf<T> = T[keyof T];
export type MessageDialogResult = ValueOf<typeof MessageDialogResult>;
