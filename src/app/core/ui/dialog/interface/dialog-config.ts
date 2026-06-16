import { DialogContentComponent } from './dialog-content';
import { Type, Injector } from '@angular/core';

/*
  Unlike Java (which infers types from class declarations), TypeScript uses 
  "Structural Typing" (checking the shape of the object). Type parameters 
  MUST be actively used in public methods or properties to be automatically 
  inferred by consumer services (like DialogService.open).
*/
export interface DialogConfig<DATA, RESULT> {
  readonly interfaceTag: 'dialogConfig';

  getWidth(): string;

  getHeight(): string;

  getDisableClose(): boolean;

  /*
		Unlike Java's strict generic variance rules, TypeScript's structural type 
   	system natively allows specific subclasses to satisfy this base type contract.
	*/
  getContentComponentType(): Type<DialogContentComponent<DATA, RESULT>>;

  getDialogContentData(): DATA;

  getInjector(): Injector | undefined;
}
