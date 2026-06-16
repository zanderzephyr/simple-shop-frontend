export const MessageDialogResult: {
  readonly CONFIRM: { readonly id: 'CONFIRM'; name: 'Confirm' };
  readonly CANCEL: { readonly id: 'CANCEL'; name: 'Cancel' };
} = {
  CONFIRM: { id: 'CONFIRM', name: 'Confirm' },
  CANCEL: { id: 'CANCEL', name: 'Cancel' },
} as const;
type ValueOf<T> = T[keyof T];
export type MessageDialogResult = ValueOf<typeof MessageDialogResult>;
