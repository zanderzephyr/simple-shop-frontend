import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { Renderer } from '@core/ui/renderer/renderer';
import { CommonTableCellContext } from './common-table-cell-context';

@Directive()
export abstract class TableCellRenderer<TYPE> implements Renderer<TYPE> {
  readonly interfaceTag: 'renderer' = 'renderer';

  public readonly context: InputSignal<CommonTableCellContext> =
    input.required<CommonTableCellContext>();

  protected readonly value: Signal<TYPE> = computed(
    () =>
      this.context()
        .getTable()
        .getValueAt(
          this.context().getColumnViewIndex(),
          this.context().getRowViewIndex(),
        )() as TYPE,
  );

  public constructor() {
    // Nothing to do so far
  }
}
