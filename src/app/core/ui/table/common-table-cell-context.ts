import { Table } from './table';

const secretKey: symbol = Symbol('secretKey');

interface ContextData {
  [secretKey]: true; // Marker to prevent external construction
  table: Table;
  columnViewIndex: number;
  rowViewIndex: number;
}

export class CommonTableCellContext {
  readonly #table: Table;
  readonly #columnViewIndex: number;
  readonly #rowViewIndex: number;

  public constructor(contextData: ContextData) {
    this.#table = contextData.table;
    this.#columnViewIndex = contextData.columnViewIndex;
    this.#rowViewIndex = contextData.rowViewIndex;

    Object.freeze(this);
  }

  public getTable(): Table {
    return this.#table;
  }

  public getColumnViewIndex(): number {
    return this.#columnViewIndex;
  }

  public getRowViewIndex(): number {
    return this.#rowViewIndex;
  }
}

export class CommonTableCellContextBuilder {
  #table?: Table;
  #columnViewIndex?: number;
  #rowViewIndex?: number;

  public constructor() {
    // Nothing to do so far
  }

  public getTable(): Table | undefined {
    return this.#table;
  }

  public setTable(table: Table): this {
    this.#table = table;
    return this;
  }

  public getColumnViewIndex(): number | undefined {
    return this.#columnViewIndex;
  }

  public setColumnViewIndex(columnViewIndex: number): this {
    this.#columnViewIndex = columnViewIndex;
    return this;
  }

  public getRowViewIndex(): number | undefined {
    return this.#rowViewIndex;
  }

  public setRowViewIndex(rowViewIndex: number): this {
    this.#rowViewIndex = rowViewIndex;
    return this;
  }

  #createContextDataOrThrow(): ContextData {
    this.#validate();

    return {
      [secretKey]: true,
      table: this.#table!,
      columnViewIndex: this.#columnViewIndex!,
      rowViewIndex: this.#rowViewIndex!,
    };
  }

  #validate(): void {
    if (this.#table === undefined) {
      throw new Error('No table!');
    }

    if (this.#columnViewIndex === undefined || this.#columnViewIndex < 0) {
      throw new Error('Invalid column view index!');
    }

    if (this.#rowViewIndex === undefined || this.#rowViewIndex < 0) {
      throw new Error('Invalid row view index!');
    }
  }

  public build(): CommonTableCellContext {
    return new CommonTableCellContext(this.#createContextDataOrThrow());
  }
}
