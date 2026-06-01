import {
  ComponentRef,
  Type,
  Component,
  effect,
  Signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonTableCellComponent } from '../../common-table-cell-component';

@Component({
  selector: 'app-ng-mat-table-cell',
  imports: [],
  templateUrl: './ng-mat-table-cell.html',
  styleUrl: './ng-mat-table-cell.css',
})
export class NgMatTableCellComponent extends CommonTableCellComponent {
  readonly content: Signal<ViewContainerRef | undefined> = viewChild('content', {
    read: ViewContainerRef,
  });

  // Keep a local reference to the active dynamic component instance
  #currentComponentRef: ComponentRef<unknown> | null = null;

  public constructor() {
    super();

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

      this.#currentComponentRef.setInput('table', this.table());
      this.#currentComponentRef.setInput('columnViewIndex', this.columnViewIndex());
      this.#currentComponentRef.setInput('rowViewIndex', this.rowViewIndex());
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
