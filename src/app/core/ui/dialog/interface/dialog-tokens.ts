import { InjectionToken } from '@angular/core';
import { DialogReference } from './dialog-reference';
import { DialogContentData } from './dialog-content-data';

export const DIALOG_REFERENCE: InjectionToken<DialogReference<any>> = new InjectionToken<
  DialogReference<any>
>('DIALOG_REFERENCE');

export const DIALOG_DATA: InjectionToken<DialogContentData> = new InjectionToken<DialogContentData>(
  'DIALOG_DATA',
);
