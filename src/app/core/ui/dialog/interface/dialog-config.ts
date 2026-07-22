import { DialogContentComponent } from './dialog-content';
import { Type, Injector } from '@angular/core';

/*
  Unlike Java (which infers types from class declarations), TypeScript uses 
  "Structural Typing" (checking the shape of the object). Type parameters 
  MUST be actively used in public methods or properties to be automatically 
  inferred by consumer services (like DialogService.open).
*/
export class DialogConfig<DATA, RESULT> {
  #width: string | undefined;

  #height: string | undefined;

  #disableClose: boolean = false;

  #restoreFocus: boolean = false;

  #contentComponentType: Type<DialogContentComponent<DATA, RESULT>>;

  #dialogData: DATA;

  #injector: Injector | undefined;

  public constructor(
    dialogData: DATA,
    contentComponentType: Type<DialogContentComponent<DATA, RESULT>>,
  ) {
    this.#dialogData = dialogData;
    this.#contentComponentType = contentComponentType;
  }

  public getWidth(): string | undefined {
    return this.#width;
  }

  public setWidth(width: string | undefined): this {
    this.#width = width;

    return this;
  }

  public getHeight(): string | undefined {
    return this.#height;
  }

  public setHeight(height: string | undefined): this {
    this.#height = height;

    return this;
  }

  public getDisableClose(): boolean {
    return this.#disableClose;
  }

  public setDisableClose(disableClose: boolean): this {
    this.#disableClose = disableClose;

    return this;
  }

  public getRestoreFocus(): boolean {
    return this.#restoreFocus;
  }

  public setRestoreFocus(restoreFocus: boolean): this {
    this.#restoreFocus = restoreFocus;

    return this;
  }

  /*
		Unlike Java's strict generic variance rules, TypeScript's structural type 
   	system natively allows specific subclasses to satisfy this base type contract.
	*/
  public getContentComponentType(): Type<DialogContentComponent<DATA, RESULT>> {
    return this.#contentComponentType;
  }

  public setContentComponentType(
    contentComponentType: Type<DialogContentComponent<DATA, RESULT>>,
  ): this {
    this.#contentComponentType = contentComponentType;

    return this;
  }

  public getDialogData(): DATA {
    return this.#dialogData;
  }

  public setDialogData(dialogData: DATA): this {
    this.#dialogData = dialogData;

    return this;
  }

  public getInjector(): Injector | undefined {
    return this.#injector;
  }

  public setInjector(injector: Injector | undefined): this {
    this.#injector = injector;

    return this;
  }
}
