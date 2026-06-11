import { Type } from '@angular/core';
import { DialogConfig } from '@ui/dialog/interface/dialog-config';
import { DialogContent } from '@ui/dialog/interface/dialog-content';
import { DialogData } from '@ui/dialog/interface/dialog-data';

export class DefaultDialogConfig<
  CONTENT extends DialogContent<any>,
  DATA extends DialogData,
> implements DialogConfig<CONTENT, DATA> {
  public readonly interfaceTag: 'dialogConfig' = 'dialogConfig';

  readonly #contentComponentType: Type<CONTENT>;

  readonly #dialogData: DATA;

  #disableClose: boolean;
  #height: string;
  #width: string;

  public constructor(contentComponentType: Type<CONTENT>, dialogData: DATA) {
    this.#contentComponentType = contentComponentType;
    this.#dialogData = dialogData;
    this.#disableClose = false;
    this.#height = '400px';
    this.#width = '400px';
  }

  public getContentComponentType(): Type<CONTENT> {
    return this.#contentComponentType;
  }

  public getDialogData(): DATA {
    return this.#dialogData;
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
