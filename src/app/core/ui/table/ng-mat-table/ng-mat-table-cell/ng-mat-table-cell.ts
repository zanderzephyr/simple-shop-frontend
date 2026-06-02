import {
  ComponentRef,
  Type,
  Component,
  effect,
  Signal,
  viewChild,
  ViewContainerRef,
  input,
  InputSignal,
} from '@angular/core';
import { Table } from '../../table';
import {
  CommonTableCellContext,
  CommonTableCellContextBuilder,
} from '@core/ui/table/common-table-cell-context';

@Component({
  selector: 'app-ng-mat-table-cell',
  imports: [],
  templateUrl: './ng-mat-table-cell.html',
  styleUrl: './ng-mat-table-cell.css',
})
export class NgMatTableCellComponent {
  public readonly table: InputSignal<Table> = input.required<Table>();

  public readonly columnViewIndex: InputSignal<number> = input.required<number>();

  public readonly rowViewIndex: InputSignal<number> = input.required<number>();

  readonly content: Signal<ViewContainerRef | undefined> = viewChild('content', {
    read: ViewContainerRef,
  });

  // Keep a local reference to the active dynamic component instance
  #currentComponentRef: ComponentRef<unknown> | null = null;

  public constructor() {
    effect(() => {
      // Immediately execute the signals to register the effect properly.
      const type: Type<unknown> | string = this.table()
        .getTableColumnModel()
        .getTableColumns()()
        [this.columnViewIndex()].getType();

      let viewContainer: ViewContainerRef | undefined = this.content();
      if (!viewContainer) {
        return; // Template isn't built yet; bail early safely
      }

      if (!this.#isTableCellComponent(type)) {
        this.#clearComponent();
        return;
      }

      if (!this.#currentComponentRef || this.#currentComponentRef.componentType !== type) {
        this.#clearComponent();
        this.#currentComponentRef = viewContainer.createComponent(type as Type<unknown>);
      }

      const cellContext: CommonTableCellContext = new CommonTableCellContextBuilder()
        .setTable(this.table())
        .setColumnViewIndex(this.columnViewIndex())
        .setRowViewIndex(this.rowViewIndex())
        .build();
      this.#currentComponentRef.setInput('context', cellContext);
    });
  }

  #clearComponent(): void {
    if (this.#currentComponentRef) {
      this.#currentComponentRef.destroy();
      this.#currentComponentRef = null;
      this.content()!.clear();
    }
  }

  #isTableCellComponent(value: string | Type<unknown>): boolean {
    return typeof value !== 'string';
  }
}
