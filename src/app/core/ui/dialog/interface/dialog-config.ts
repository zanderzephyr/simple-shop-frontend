import { DialogData } from './dialog-data';
import { DialogContent } from './dialog-content';
import { Type } from '@angular/core';

export interface DialogConfig<CONTENT extends DialogContent<any>, DATA extends DialogData> {
  getWidth(): string;

  getHeight(): string;

  getDisableClose(): boolean;

  getContentComponentType(): Type<CONTENT>;

  getDialogData(): DATA;
}
