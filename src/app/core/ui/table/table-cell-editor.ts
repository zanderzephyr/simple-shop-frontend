import { Directive, input, InputSignal } from '@angular/core';
import { Editor } from '@core/ui/editor/editor';
import { CommonTableCellContext } from './common-table-cell-context';

@Directive()
export abstract class TableCellEditor<TYPE> implements Editor<TYPE> {
  readonly interfaceTag: 'editor' = 'editor';

  public readonly context: InputSignal<CommonTableCellContext> =
    input.required<CommonTableCellContext>();

  public constructor() {
    // Nothing to do so far
  }
}
