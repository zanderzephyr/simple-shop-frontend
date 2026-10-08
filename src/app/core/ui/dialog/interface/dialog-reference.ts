export interface DialogReference<RESULT> {
	/**
	 * Retrieves a promise to the result of the dialog. This promise
	 * is resolved when the dialog closes via any possible scenario.
	 *
	 * On resolve, returns undefined if the dialog doesn't use results
	 * or if the dialog is in an invalid state when it is closed
	 * (e.g. a form was only partially filled when the dialog is closed
	 * or the dialog was not closed via a confirmation action).
	 * Otherwise, an actual value is returned.
	 */
	getResult(): Promise<RESULT | undefined>;

	/**
	 * Closes the dialog and returns a promise for until after closing has finished.
	 *
	 * If the content component of this dialog calls this method, it is required to
	 * have created the result it wants to return prior to that. The result has to
	 * be accessible via the getResult() method of the content component. (If the
	 * content component closes in an invalid result state, it is encouraged
	 * to return undefined as result.)
	 *
	 * If discardResult is missing, the default value of false is assumed. If
	 * discardResult is true, the result of the dialog content component is discarded
	 * and the dialog returns the result undefined. If discardResult is false, the dialog
	 * returns the result of the dialog content component.
	 */
	close(discardResult?: boolean): Promise<void>;
}
