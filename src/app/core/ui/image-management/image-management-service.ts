export interface ImageManagementService {
	getAllowedFileTypes(): readonly string[];

	/**
	 * Uploads an image and returns a promise for the resulting storage key.
	 *
	 * @param file
	 */
	uploadImage(file: File): Promise<string>;

	removeImage(storageKey: string): Promise<void>;

	// Creates the formatted url internally and decides over all the download url parameters.
	createDownloadUrl(storageKey: string): string;
}
