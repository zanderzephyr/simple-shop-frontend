import { DialogResult } from './dialog-result';

export interface DialogReference<RESULT extends DialogResult> {
  readonly interfaceTag: 'dialogReference';

  close(): Promise<RESULT | undefined>;
}
