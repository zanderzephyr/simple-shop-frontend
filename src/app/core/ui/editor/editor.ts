// Just for type safety of the generic type of Editor.
const EDITOR_TYPE_SYMBOL: unique symbol = Symbol('EditorTypeSymbol');

export interface Editor<TYPE> {
	readonly interfaceTag: 'editor';

	// Ignore. Just for type safety.
	[EDITOR_TYPE_SYMBOL]?(): TYPE;
}
