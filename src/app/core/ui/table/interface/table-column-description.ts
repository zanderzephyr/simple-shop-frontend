import { Type } from '@angular/core';
import { IllegalStateError } from '@core/utils/common-errors';
import { Editor } from '@ui//editor/editor';
import { Renderer } from '@ui/renderer/renderer';
import { ZodString, ZodType } from 'zod';

const secretKey: symbol = Symbol('secretKey');

/*
 Not exported, just as an internal part of the contract.
 Nobody can call the Item constructor without this interface
 being exported.
 */
interface TableColumnDescriptionData<TYPE> {
	[secretKey]: true; // Marker to prevent external construction
	modelIndex: number;
	title: string;
	typeSchema: ZodType<TYPE>;
	rendererType: Type<Renderer<TYPE>>;
	editorType?: Type<Editor<TYPE>>;
	width?: string;
	valuesNeedLocalization: boolean;
}

export class TableColumnDescription<TYPE> {
	readonly #modelIndex: number;

	readonly #title: string;

	readonly #typeSchema: ZodType<TYPE>;

	readonly #rendererType: Type<Renderer<TYPE>>;

	readonly #editorType?: Type<Editor<TYPE>>;

	readonly #width?: string;

	readonly #valuesNeedLocalization: boolean;

	public constructor(data: TableColumnDescriptionData<TYPE>) {
		this.#modelIndex = data.modelIndex;
		this.#title = data.title;
		this.#typeSchema = data.typeSchema;
		this.#rendererType = data.rendererType;
		this.#editorType = data.editorType;
		this.#width = data.width;
		this.#valuesNeedLocalization = data.valuesNeedLocalization;
	}

	public getModelIndex(): number {
		return this.#modelIndex;
	}

	public getTitle(): string {
		return this.#title;
	}

	public getTypeSchema(): ZodType<TYPE> {
		return this.#typeSchema;
	}

	public getRendererType(): Type<Renderer<TYPE>> {
		return this.#rendererType;
	}

	public getEditorType(): Type<Editor<TYPE>> | undefined {
		return this.#editorType;
	}

	public getWidth(): string | undefined {
		return this.#width;
	}

	public getValuesNeedLocalization(): boolean {
		return this.#valuesNeedLocalization;
	}
}

export class TableColumnDescriptionBuilder<TYPE> {
	#modelIndex?: number;

	#title?: string;

	#typeSchema?: ZodType<TYPE>;

	#rendererType?: Type<Renderer<TYPE>>;

	#editorType?: Type<Editor<TYPE>>;

	#width?: string;

	#valuesNeedLocalization: boolean = false;

	public constructor() {
		// Nothing to do so far
	}

	public getModelIndex(): number | undefined {
		return this.#modelIndex;
	}

	public setModelIndex(modelIndex: number): this {
		this.#modelIndex = modelIndex;
		return this;
	}

	public getTitle(): string | undefined {
		return this.#title;
	}

	public setTitle(title: string): this {
		this.#title = title;
		return this;
	}

	public getTypeSchema(): ZodType<TYPE> | undefined {
		return this.#typeSchema;
	}

	public setTypeSchema(typeSchema: ZodType<TYPE>): this {
		this.#typeSchema = typeSchema;
		return this;
	}

	public getRendererType(): Type<Renderer<TYPE>> | undefined {
		return this.#rendererType;
	}

	public setRendererType(rendererType: Type<Renderer<TYPE>>): this {
		this.#rendererType = rendererType;
		return this;
	}

	public getEditorType(): Type<Editor<TYPE>> | undefined {
		return this.#editorType;
	}

	public setEditorType(editorType: Type<Editor<TYPE>> | undefined): this {
		this.#editorType = editorType;
		return this;
	}

	public getWidth(): string | undefined {
		return this.#width;
	}

	public setWidth(width: string | undefined): this {
		this.#width = width;
		return this;
	}

	public getValuesNeedLocalization(): boolean {
		return this.#valuesNeedLocalization;
	}

	public setValuesNeedLocalization(valuesNeedLocalization: boolean): this {
		this.#valuesNeedLocalization = valuesNeedLocalization;

		return this;
	}

	#createTableColumnDescriptionData(): TableColumnDescriptionData<TYPE> {
		this.#validate();

		// Existence of fields relies on the validation above.
		return {
			[secretKey]: true,
			modelIndex: this.#modelIndex!,
			title: this.#title!,
			typeSchema: this.#typeSchema!,
			rendererType: this.#rendererType!,
			editorType: this.#editorType,
			width: this.#width,
			valuesNeedLocalization: this.#valuesNeedLocalization
		};
	}

	#validate(): void {
		if (this.#modelIndex === undefined || this.#modelIndex < 0) {
			throw new IllegalStateError('Invalid model index!');
		}

		if (this.#title === undefined || this.#title.trim().length === 0) {
			throw new IllegalStateError('No title!');
		}

		if (this.#typeSchema === undefined) {
			throw new IllegalStateError('No type schema!');
		}

		if (this.#rendererType === undefined) {
			throw new IllegalStateError('No renderer type!');
		}

		if (this.#width !== undefined && this.#width.trim().length === 0) {
			throw new IllegalStateError('No width!');
		}

		if (this.#valuesNeedLocalization && !(this.#typeSchema instanceof ZodString)) {
			throw new IllegalStateError('Only string columns can be localized!');
		}
	}

	public build(): TableColumnDescription<TYPE> {
		return new TableColumnDescription<TYPE>(this.#createTableColumnDescriptionData());
	}
}
