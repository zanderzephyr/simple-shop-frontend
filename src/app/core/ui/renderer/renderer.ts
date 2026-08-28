// Just for type safety of the generic type of Editor.
const RENDERER_TYPE_SYMBOL = Symbol('RendererTypeSymbol');

export interface Renderer<TYPE> {
	readonly interfaceTag: 'renderer';

	// Ignore. Just for type safety.
	[RENDERER_TYPE_SYMBOL]?(): TYPE;
}
