import { IllegalStateError } from '@core/utils/common-errors';
import { z, ZodType } from 'zod';

const secretKey: symbol = Symbol('secretKey');

interface PageMetaDataData {
  [secretKey]: true; // Marker to prevent external construction
  pageSize: number;
  pageIndex: number;
  totalElements: number;
  totalPages: number;
}

export class PageMetaData {
  readonly #pageSize: number;

  readonly #pageIndex: number;

  readonly #totalElements: number;

  readonly #totalPages: number;

  constructor(pageMetaDataData: PageMetaDataData) {
    this.#pageSize = pageMetaDataData.pageSize;
    this.#pageIndex = pageMetaDataData.pageIndex;
    this.#totalElements = pageMetaDataData.totalElements;
    this.#totalPages = pageMetaDataData.totalPages;

    Object.freeze(this);
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

class PageMetaDataBuilder {
  #pageIndex?: number;
  #pageSize?: number;
  #totalElements?: number;
  #totalPages?: number;

  public constructor() {
    // Nothing to do so far
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

  #createPageMetaDataData(): PageMetaDataData {
    this.#validate();

    return {
      [secretKey]: true,
      pageIndex: this.#pageIndex!,
      pageSize: this.#pageSize!,
      totalElements: this.#totalElements!,
      totalPages: this.#totalPages!,
    };
  }

  #validate(): void {
    if (this.#pageIndex === undefined) {
      throw new IllegalStateError('No page index!');
    }

    if (this.#pageSize === undefined) {
      throw new IllegalStateError('No page size!');
    }

    if (this.#totalElements === undefined) {
      throw new IllegalStateError('No total elements!');
    }

    if (this.#totalPages === undefined) {
      throw new IllegalStateError('No total pages!');
    }
  }

  public build(): PageMetaData {
    return new PageMetaData(this.#createPageMetaDataData());
  }
}

export interface PageMetaDataDto {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

function zodPageMetaDataDto(): ZodType<PageMetaDataDto> {
  return z.object({
    number: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
  });
}

export function zodPageMetaData(): ZodType<PageMetaData> {
  return zodPageMetaDataDto().transform((dto): PageMetaData => {
    return new PageMetaDataBuilder()
      .setPageIndex(dto.number)
      .setPageSize(dto.size)
      .setTotalElements(dto.totalElements)
      .setTotalPages(dto.totalPages)
      .build();
  });
}
