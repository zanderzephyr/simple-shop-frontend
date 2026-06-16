import { DialogContentComponent } from './dialog-content';
import { Type, Injector } from '@angular/core';

export interface DialogConfig<DATA, RESULT, CONTENT extends DialogContentComponent<DATA, RESULT>> {
  readonly interfaceTag: 'dialogConfig';

  getWidth(): string;

  getHeight(): string;

  getDisableClose(): boolean;

  getContentComponentType(): Type<CONTENT>;

  getDialogContentData(): DATA;

  getInjector(): Injector | undefined;
}
