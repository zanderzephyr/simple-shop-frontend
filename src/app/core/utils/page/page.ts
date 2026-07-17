import { InvalidStateError } from '@core/utils/common-errors';
import { z, ZodType } from 'zod';

const secretKey: symbol = Symbol('secretKey');

interface PageData<T> {
  [secretKey]: true; // Marker to prevent external construction
  content: T[];
  pageIndex: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export class Page<T> {
  readonly #content: T[];

  readonly #pageIndex: number;

  readonly #pageSize: number;

  readonly #totalElements: number;

  readonly #totalPages: number;

  public constructor(pageData: PageData<T>) {
    this.#content = pageData.content;
    this.#pageIndex = pageData.pageIndex;
    this.#pageSize = pageData.pageSize;
    this.#totalElements = pageData.totalElements;
    this.#totalPages = pageData.totalPages;

    Object.freeze(this);
  }

  public getContent(): readonly T[] {
    return Object.freeze(this.#content);
  }

  public getPageIndex(): number {
    return this.#pageIndex;
  }

  public getPageSize(): number {
    return this.#pageSize;
  }

  public getTotalElements(): number {
    return this.#totalElements;
  }

  public getTotalPages(): number {
    return this.#totalPages;
  }
}

export class PageBuilder<T> {
  #content?: T[];
  #pageIndex?: number;
  #pageSize?: number;
  #totalElements?: number;
  #totalPages?: number;

  public constructor() {
    // Nothing to do so far
  }

  public getContent(): readonly T[] | undefined {
    return Object.freeze(this.#content);
  }

  public setContent(content: T[]): this {
    this.#content = content;
    return this;
  }

  public getPageIndex(): number | undefined {
    return this.#pageIndex;
  }

  public setPageIndex(pageIndex: number): this {
    this.#pageIndex = pageIndex;
    return this;
  }

  public getPageSize(): number | undefined {
    return this.#pageSize;
  }

  public setPageSize(pageSize: number): this {
    this.#pageSize = pageSize;
    return this;
  }

  public getTotalElements(): number | undefined {
    return this.#totalElements;
  }

  public setTotalElements(totalElements: number): this {
    this.#totalElements = totalElements;
    return this;
  }

  public getTotalPages(): number | undefined {
    return this.#totalPages;
  }

  public setTotalPages(totalPages: number): this {
    this.#totalPages = totalPages;
    return this;
  }

  #createPageData(): PageData<T> {
    this.#validate();

    return {
      [secretKey]: true,
      content: this.#content!,
      pageIndex: this.#pageIndex!,
      pageSize: this.#pageSize!,
      totalElements: this.#totalElements!,
      totalPages: this.#totalPages!,
    };
  }

  #validate(): void {
    if (this.#content === undefined) {
      throw new InvalidStateError('No page content!');
    }

    if (this.#pageIndex === undefined) {
      throw new InvalidStateError('No page index!');
    }

    if (this.#pageSize === undefined) {
      throw new InvalidStateError('No page size!');
    }

    if (this.#totalElements === undefined) {
      throw new InvalidStateError('No total elements!');
    }

    if (this.#totalPages === undefined) {
      throw new InvalidStateError('No total pages!');
    }
  }

  public build(): Page<T> {
    return new Page<T>(this.#createPageData());
  }
}

export interface PageDto<T> {
  content: T[];
  pageIndex: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export function zodPage<T>(innerSchema: ZodType<T>): ZodType<Page<T>> {
  return z
    .object({
      content: z.array(innerSchema),
      pageIndex: z.number(),
      pageSize: z.number(),
      totalElements: z.number(),
      totalPages: z.number(),
    })
    .transform((data): Page<T> => {
      return new PageBuilder<T>()
        .setContent(data.content)
        .setPageIndex(data.pageIndex)
        .setPageSize(data.pageSize)
        .setTotalElements(data.totalElements)
        .setTotalPages(data.totalPages)
        .build();
    });
}
