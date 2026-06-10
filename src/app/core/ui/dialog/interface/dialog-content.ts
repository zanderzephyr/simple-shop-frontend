import { DialogResult } from './dialog-result';

export interface DialogContent<RESULT extends DialogResult> {
  createResult(): RESULT;
}
