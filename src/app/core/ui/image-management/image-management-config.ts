export abstract class ImageManagementConfig {
	protected constructor() {
		// Nothing to do so far
	}

	public abstract getAllowedFileTypes(): readonly string[];

	/**
	 * Uploads an image and returns a promise for the resulting storage key or for undefined in case of an error.
	 *
	 * @param file
	 */
	public abstract uploadImage(file: File): Promise<string | undefined>;

	public abstract removeImage(storageKey: string): Promise<void>;

	// Creates the formatted url internally and decides over all the download url parameters.
	public abstract createDownloadUrl(storageKey: string): string;
}
