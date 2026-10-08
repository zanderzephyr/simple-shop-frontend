import { Directive, input, InputSignal } from '@angular/core';
import { Editor } from '@ui/editor/editor';
import { TableCellContext } from './table-cell-context';

@Directive()
export abstract class TableCellEditorComponent<TYPE> extends Editor<TYPE> {
	public readonly context: InputSignal<TableCellContext> = input.required<TableCellContext>();

	protected constructor() {
		super();
	}
}
