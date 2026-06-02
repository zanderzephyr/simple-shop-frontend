import { Type } from '@angular/core';
import { Editor } from '@core/ui//editor/editor';
import { Renderer } from '@core/ui/renderer/renderer';

export type ColumnType<TYPE> = TYPE extends string
  ? 'string'
  : TYPE extends number
    ? 'number'
    : TYPE extends boolean
      ? 'boolean'
      : TYPE extends Date
        ? 'date'
        : Type<TYPE>; // Fallback to class type for custom objects

export class TableColumnDescription<TYPE> {
  readonly #modelIndex: number;

  readonly #title: string;

  readonly #type: ColumnType<TYPE>;

  readonly #rendererType: Type<Renderer<TYPE>>;

  readonly #editorType: Type<Editor<TYPE>>;

  public constructor(
    modelIndex: number,
    title: string,
    type: ColumnType<TYPE>,
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

  public getType(): ColumnType<TYPE> {
    return this.#type;
  }

  public getRendererType(): Type<Renderer<TYPE>> {
    return this.#rendererType;
  }

  public getEditorType(): Type<Editor<TYPE>> {
    return this.#editorType;
  }
}
