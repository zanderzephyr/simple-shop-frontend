export const MessageDialogResult: {
  readonly CONFIRM: { readonly id: 'CONFIRM' };
  readonly CANCEL: { readonly id: 'CANCEL' };
} = {
  CONFIRM: { id: 'CONFIRM' },
  CANCEL: { id: 'CANCEL' },
} as const;
type ValueOf<T> = T[keyof T];
export type MessageDialogResult = ValueOf<typeof MessageDialogResult>;
