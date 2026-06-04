import { Type } from '@angular/core';
import { Editor } from '@core/ui//editor/editor';
import { Renderer } from '@core/ui/renderer/renderer';
import { z, ZodType } from 'zod';

export class TableColumnDescription<TYPE> {
  readonly #modelIndex: number;

  readonly #title: string;

  readonly #type: ZodType<TYPE>;

  readonly #rendererType: Type<Renderer<TYPE>>;

  readonly #editorType: Type<Editor<TYPE>>;

  public constructor(
    modelIndex: number,
    title: string,
    type: ZodType<TYPE>,
    rendererType: Type<Renderer<TYPE>>,
    editorType: Type<Editor<TYPE>>,
  ) {
    this.#modelIndex = modelIndex;
    this.#title = title;
    this.#type = type;
    this.#rendererType = rendererType;
    this.#editorType = editorType;
  }

  public getModelIndex(): number {
    return this.#modelIndex;
  }

  public getTitle(): string {
    return this.#title;
  }

  public getType(): z.ZodType<TYPE> {
    return this.#type;
  }

  public getRendererType(): Type<Renderer<TYPE>> {
    return this.#rendererType;
  }

  public getEditorType(): Type<Editor<TYPE>> {
    return this.#editorType;
  }
}
