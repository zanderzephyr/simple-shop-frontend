import { DialogContentData } from './dialog-content-data';
import { DialogContent } from './dialog-content';
import { Type, Injector } from '@angular/core';

export interface DialogConfig<
  DATA extends DialogContentData,
  CONTENT extends DialogContent<DATA, any>,
> {
  readonly interfaceTag: 'dialogConfig';

  getWidth(): string;

  getHeight(): string;

  getDisableClose(): boolean;

  getContentComponentType(): Type<CONTENT>;

  getDialogContentData(): DATA;

  getInjector(): Injector | undefined;
}
