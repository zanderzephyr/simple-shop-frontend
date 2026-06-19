import { DialogContentComponent } from './dialog-content';
import { Type, Injector } from '@angular/core';

/*
  Unlike Java (which infers types from class declarations), TypeScript uses 
  "Structural Typing" (checking the shape of the object). Type parameters 
  MUST be actively used in public methods or properties to be automatically 
  inferred by consumer services (like DialogService.open).
*/
export class DialogConfig<DATA, RESULT> {
  #width: string = '400px';

  #height: string = '400px';

  #disableClose: boolean = false;

  #contentComponentType: Type<DialogContentComponent<DATA, RESULT>>;

  #dialogContentData: DATA;

  #injector: Injector | undefined;

  public constructor(
    dialogContentData: DATA,
    contentComponentType: Type<DialogContentComponent<DATA, RESULT>>,
  ) {
    this.#dialogContentData = dialogContentData;
    this.#contentComponentType = contentComponentType;
  }

  public getWidth(): string {
    return this.#width;
  }

  public setWidth(width: string): this {
    this.#width = width;

    return this;
  }

  public getHeight(): string {
    return this.#height;
  }

  public setHeight(height: string): this {
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

  public getDialogContentData(): DATA {
    return this.#dialogContentData;
  }

  public setDialogContentData(dialogContentData: DATA): this {
    this.#dialogContentData = dialogContentData;

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
