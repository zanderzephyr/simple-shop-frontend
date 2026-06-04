import { Type, WritableSignal, signal } from '@angular/core';
import { TableColumnDescription } from './table-column-description';
import { TableColumn } from '@core/ui/table/table-column';
import { Editor } from '../editor/editor';
import { Renderer } from '../renderer/renderer';
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
  readonly #type: ZodType<TYPE>;
  readonly #rendererType: Type<Renderer<TYPE>>;
  readonly #editorType: Type<Editor<TYPE>>;

  public constructor(columnDescription: TableColumnDescription<TYPE>) {
    this.#modelIndex = columnDescription.getModelIndex();
    this.#title = signal(columnDescription.getTitle());
    this.#type = columnDescription.getType();
    this.#hidden = signal(false);
    this.#rendererType = columnDescription.getRendererType();
    this.#editorType = columnDescription.getEditorType();
  }

  public getModelIndex(): number {
    return this.#modelIndex;
  }

  public getType(): ZodType<TYPE> {
    return this.#type;
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

  public getEditorType(): Type<Editor<TYPE>> {
    return this.#editorType;
  }
}
