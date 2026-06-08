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
import { Table } from '@core/ui/table/interface/table';
import {
  TableCellContext,
  TableCellContextBuilder,
} from '@core/ui/table/interface/table-cell-context';
import { TableColumn } from '@core/ui/table/interface/table-column';
import { TableCellRenderer } from '@core/ui/table/interface/table-cell-renderer';
import { TableCellEditor } from '@core/ui/table/interface/table-cell-editor';
import { Renderer } from '@core/ui/renderer/renderer';

/*
 TODO On click, replace renderer by editor.
*/

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
  #currentComponentRef: ComponentRef<unknown> | undefined = undefined;

  public constructor() {
    effect(() => {
      // Immediately execute the signals to register the effect properly.
      const column: TableColumn<unknown> = this.table().getTableColumnModel().getTableColumns()()[
        this.columnViewIndex()
      ];

      let viewContainer: ViewContainerRef | undefined = this.content();
      if (!viewContainer) {
        return; // Template isn't built yet; bail early safely
      }

      // TODO Properly recognize if we should choose the renderer or the editor.

      const type: Type<Renderer<unknown>> = column.getRendererType();
      if (!this.#currentComponentRef || this.#currentComponentRef.componentType !== type) {
        this.#clearComponent();
        this.#currentComponentRef = viewContainer.createComponent(type);
      }

      if (
        this.#currentComponentRef.instance instanceof TableCellRenderer ||
        this.#currentComponentRef.instance instanceof TableCellEditor
      ) {
        const cellContext: TableCellContext = new TableCellContextBuilder()
          .setTable(this.table())
          .setColumnViewIndex(this.columnViewIndex())
          .setRowViewIndex(this.rowViewIndex())
          .build();
        this.#currentComponentRef.setInput('context', cellContext);
      } else {
        const value: unknown = this.table().getValueAt(this.columnViewIndex(), this.rowViewIndex());
        this.#currentComponentRef.setInput('valueInput', value);
      }
    });
  }

  #clearComponent(): void {
    if (this.#currentComponentRef) {
      this.#currentComponentRef.destroy();
      this.#currentComponentRef = undefined;
      this.content()!.clear();
    }
  }
}
