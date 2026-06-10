import { DialogResult } from './dialog-result';

export interface DialogReference<RESULT extends DialogResult> {
  close(): Promise<RESULT | undefined>;
}
