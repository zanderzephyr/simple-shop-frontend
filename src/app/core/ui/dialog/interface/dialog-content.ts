import { DialogResult } from './dialog-result';

export interface DialogContent<RESULT extends DialogResult> {
  readonly interfaceTag: 'dialogContent';

  createResult(): RESULT;
}
