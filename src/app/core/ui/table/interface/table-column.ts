import { Type } from '@angular/core';
import { Editor } from '@ui/editor/editor';
import { Renderer } from '@ui/renderer/renderer';
import { ZodType } from 'zod';

/*
	TODO Add a persistence source, from which user specific configurations like
	column ordering, hidden state, specific and so on can be requested. That
	source should be on server side, to prevent it from being lost on client resets.

	TODO Renderer and editor on basis of the formatter I assume

	TODO Add viewIndex I assume
*/
export interface TableColumn<TYPE> {
	getModelIndex(): number;

	getTypeSchema(): ZodType<TYPE>;

	getHidden(): boolean;

	getTitle(): string;

	getRendererType(): Type<Renderer<TYPE>>;

	getEditorType(): Type<Editor<TYPE>> | undefined;

	getWidth(): string | undefined;
}
