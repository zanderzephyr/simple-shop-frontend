import { InjectionToken } from '@angular/core';
import { DialogContentData } from './dialog-content-data';

export const DIALOG_DATA: InjectionToken<DialogContentData> = new InjectionToken<DialogContentData>(
  'DIALOG_DATA',
);
