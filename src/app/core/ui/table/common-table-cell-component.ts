import { Directive, input, InputSignal } from '@angular/core';
import { Table } from '@core/ui/table/table';

@Directive()
export abstract class CommonTableCellComponent {
  public readonly table: InputSignal<Table> = input.required<Table>();

  public readonly columnViewIndex: InputSignal<number> = input.required<number>();

  public readonly rowViewIndex: InputSignal<number> = input.required<number>();

  public constructor() {
    // Nothing to do so far
  }
}
