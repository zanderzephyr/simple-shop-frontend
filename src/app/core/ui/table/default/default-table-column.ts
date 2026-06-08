import { Type, WritableSignal, signal } from '@angular/core';
import { TableColumnDescription } from '@core/ui/table/interface/table-column-description';
import { TableColumn } from '@core/ui/table/interface/table-column';
import { Editor } from '@core/ui/editor/editor';
import { Renderer } from '@core/ui/renderer/renderer';
import { ZodType } from 'zod';

/*
	TODO Add a persistence source, from which user specific configurations like
	column ordering, hidden state, specific and so on can be requested. That
	source should be on server side, to prevent it from being lost on client resets.
*/
export class DefaultTableColumn<TYPE> implements TableColumn<TYPE> {
  readonly #title: WritableSignal<string>;
  readonly #hidden: WritableSignal<boolean>;
  readonly #modelIndex: number;
  readonly #typeSchema: ZodType<TYPE>;
  readonly #rendererType: Type<Renderer<TYPE>>;
  readonly #editorType: Type<Editor<TYPE>> | undefined;

  public constructor(columnDescription: TableColumnDescription<TYPE>) {
    this.#modelIndex = columnDescription.getModelIndex();
    this.#title = signal(columnDescription.getTitle());
    this.#typeSchema = columnDescription.getTypeSchema();
    this.#hidden = signal(false);
    this.#rendererType = columnDescription.getRendererType();
    this.#editorType = columnDescription.getEditorType();
  }

  public getModelIndex(): number {
    return this.#modelIndex;
  }

  public getTypeSchema(): ZodType<TYPE> {
    return this.#typeSchema;
  }

  public getHidden(): WritableSignal<boolean> {
    return this.#hidden;
  }

  public getTitle(): WritableSignal<string> {
    return this.#title;
  }

  public getRendererType(): Type<Renderer<TYPE>> {
    return this.#rendererType;
  }

  public getEditorType(): Type<Editor<TYPE>> | undefined {
    return this.#editorType;
  }
}
