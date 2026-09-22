import {
	Component,
	ComponentRef,
	effect,
	input,
	InputSignal,
	Signal,
	Type,
	viewChild,
	ViewContainerRef
} from '@angular/core';
import { IllegalArgumentError } from '@core/utils/common-errors';
import { DefaultRendererComponent } from '@ui/renderer/default-renderer';
import { Renderer } from '@ui/renderer/renderer';
import { Table } from '@ui/table/interface/table';
import { TableCellContext, TableCellContextBuilder } from '@ui/table/interface/table-cell-context';
import { TableCellEditorComponent } from '@ui/table/interface/table-cell-editor';
import { TableCellRendererComponent } from '@ui/table/interface/table-cell-renderer';
import { TableColumn } from '@ui/table/interface/table-column';

/*
 TODO On click, replace renderer by editor.

 TODO Maybe create a proper abstract structure for content projection?
*/
@Component({
	selector: 'app-ng-mat-table-cell',
	imports: [],
	templateUrl: './ng-mat-table-cell.html',
	styleUrl: './ng-mat-table-cell.scss'
})
export class NgMatTableCellComponent {
	public readonly table: InputSignal<Table> = input.required<Table>();

	public readonly columnViewIndex: InputSignal<number> = input.required<number, number>({
		transform: (value: number): number => {
			if (value < 0 || value >= this.table().getTableModel().getColumnCount()()) {
				throw new IllegalArgumentError('Column view index is out of range: ' + value);
			}
			return value;
		}
	});

	public readonly rowViewIndex: InputSignal<number> = input.required<number, number>({
		transform: (value: number): number => {
			if (value < 0 || value >= this.table().getTableModel().getRowCount()()) {
				throw new IllegalArgumentError('Row view index is out of range: ' + value);
			}
			return value;
		}
	});

	// TODO Maybe replace "content" with a unique string in the app, to prevent duplicates?
	readonly content: Signal<ViewContainerRef | undefined> = viewChild('content', {
		read: ViewContainerRef
	});

	// Keep a local reference to the active dynamic component instance
	#currentComponentRef: ComponentRef<unknown> | undefined = undefined;

	public constructor() {
		this.#init();
	}

	#init(): void {
		effect(() => {
			// Immediately execute the signals to register the effect properly.
			const column: TableColumn<unknown> = this.table().getTableColumnModel().getTableColumns()()[
				this.columnViewIndex()
				];

			let viewContainer: ViewContainerRef | undefined = this.content();
			if (viewContainer === undefined) {
				return; // Template isn't built yet; bail early safely
			}

			// TODO Properly recognize if we should choose the renderer or the editor.

			const type: Type<Renderer<unknown>> = column.getRendererType();
			if (this.#currentComponentRef === undefined || this.#currentComponentRef.componentType !== type) {
				this.#clearComponent();
				this.#currentComponentRef = viewContainer.createComponent(type);
			}

			// TODO This isn't good yet. The table should have its own abstraction layer to pass stuff to. It shouldn't
			// work with all kinds of possible renderers / editors etc. here. It shouldn't even know they exist.
			if (
				this.#currentComponentRef.instance instanceof TableCellRendererComponent ||
				this.#currentComponentRef.instance instanceof TableCellEditorComponent
			) {
				const cellContext: TableCellContext = new TableCellContextBuilder()
					.setTable(this.table())
					.setColumnViewIndex(this.columnViewIndex())
					.setRowViewIndex(this.rowViewIndex())
					.build();
				this.#currentComponentRef.setInput('context', cellContext);
			} else if (this.#currentComponentRef.instance instanceof DefaultRendererComponent) {
				const value: unknown = this.table().getValueAt(this.columnViewIndex(), this.rowViewIndex());
				this.#currentComponentRef.setInput('valueInput', value);
			}
		});
	}

	#clearComponent(): void {
		if (this.#currentComponentRef !== undefined) {
			this.#currentComponentRef.destroy();
			this.#currentComponentRef = undefined;
			this.content()!.clear();
		}
	}
}
