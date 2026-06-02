import { Directive, input, InputSignal } from '@angular/core';
import { Table } from '@core/ui/table/table';
import { CommonTableCellContext } from './common-table-cell-context';

@Directive()
export abstract class CommonTableCellComponent {
  public readonly context: InputSignal<CommonTableCellContext> =
    input.required<CommonTableCellContext>();

  public constructor() {
    // Nothing to do so far
  }
}
