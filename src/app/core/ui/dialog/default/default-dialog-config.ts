import { Type, Injector } from '@angular/core';
import { DialogConfig } from '@ui/dialog/interface/dialog-config';
import { DialogContentComponent } from '@ui/dialog/interface/dialog-content';

export class DefaultDialogConfig<
  DATA,
  RESULT,
  CONTENT extends DialogContentComponent<DATA, RESULT>,
> implements DialogConfig<DATA, CONTENT> {
  public readonly interfaceTag: 'dialogConfig' = 'dialogConfig';

  readonly #contentComponentType: Type<CONTENT>;

  readonly #dialogContentData: DATA;

  #disableClose: boolean;
  #height: string;
  #width: string;
  #injector: Injector | undefined;

  public constructor(dialogContentData: DATA, contentComponentType: Type<CONTENT>) {
    this.#contentComponentType = contentComponentType;
    this.#dialogContentData = dialogContentData;
    this.#disableClose = false;
    this.#height = '400px';
    this.#width = '400px';
  }

  public getContentComponentType(): Type<CONTENT> {
    return this.#contentComponentType;
  }

  public getDialogContentData(): DATA {
    return this.#dialogContentData;
  }

  public getDisableClose(): boolean {
    return this.#disableClose;
  }

  public setDisableClose(disableClose: boolean): this {
    this.#disableClose = disableClose;

    return this;
  }

  public getHeight(): string {
    return this.#height;
  }

  public setHeight(height: string): this {
    this.#height = height;

    return this;
  }

  public getWidth(): string {
    return this.#width;
  }

  public setWidth(width: string): this {
    this.#width = width;

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
