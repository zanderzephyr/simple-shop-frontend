import { Directive, input, InputSignal } from '@angular/core';
import { Editor } from '@core/ui/editor/editor';
import { TableCellContext } from './table-cell-context';

@Directive()
export abstract class TableCellEditor<TYPE> implements Editor<TYPE> {
  readonly interfaceTag: 'editor' = 'editor';

  public readonly context: InputSignal<TableCellContext> = input.required<TableCellContext>();

  public constructor() {
    // Nothing to do so far
  }
}
