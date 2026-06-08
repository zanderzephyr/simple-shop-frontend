import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { Renderer } from '@ui/renderer/renderer';
import { TableCellContext } from './table-cell-context';

@Directive()
export abstract class TableCellRenderer<TYPE> implements Renderer<TYPE> {
  readonly interfaceTag: 'renderer' = 'renderer';

  public readonly context: InputSignal<TableCellContext> = input.required<TableCellContext>();

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
