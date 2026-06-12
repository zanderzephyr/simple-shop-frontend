import { Type } from '@angular/core';
import { DialogConfig } from '@ui/dialog/interface/dialog-config';
import { DialogContent } from '@ui/dialog/interface/dialog-content';
import { DialogContentData } from '@app/core/ui/dialog/interface/dialog-content-data';

export class DefaultDialogConfig<
  DATA extends DialogContentData,
  CONTENT extends DialogContent<DATA, any>,
> implements DialogConfig<DATA, CONTENT> {
  public readonly interfaceTag: 'dialogConfig' = 'dialogConfig';

  readonly #contentComponentType: Type<CONTENT>;

  readonly #dialogContentData: DATA;

  #disableClose: boolean;
  #height: string;
  #width: string;

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
}
