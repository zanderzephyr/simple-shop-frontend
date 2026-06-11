import { InjectionToken } from '@angular/core';
import { DialogReference } from './dialog-reference';
import { DialogData } from './dialog-data';

export const DIALOG_REFERENCE: InjectionToken<DialogReference<any>> = new InjectionToken<
  DialogReference<any>
>('DIALOG_REFERENCE');

export const DIALOG_DATA: InjectionToken<DialogData> = new InjectionToken<DialogData>(
  'DIALOG_DATA',
);
