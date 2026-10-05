/**
 * Extracts the file type of file name. If a file name has no file type, undefined is returned.
 *
 * The file type in a file name is the shortest non-empty suffix of the file name, that immediately follows a dot ('.')
 * character.
 *
 * Take care:
 * 1. A file name is NOT the file path. It is the last path segment of a file path. Do not enter path
 * parameters here. Ancestor directories of the file could interfere with file type extraction.
 * 2. There are some file types that consist of multiple concatenated last file type suffixes, e.g. ".tar.gz". The
 * function doesn't support extracting those file types.
 * 3. Dotfiles, i.e. files with only one dot, that is the first character of the file name, have no type (i.e.
 * undefined is returned for them). If a dotfile has multiple dots, the last valid file type suffix is the file type.
 *
 * @param fileName The file name.
 */
export function determineFileType(fileName: string): string | undefined {
	const indexOfLastDot: number = fileName.lastIndexOf('.');
	if (indexOfLastDot <= 0 || fileName.length === indexOfLastDot + 1) {
		return undefined;
	}

	return fileName.substring(indexOfLastDot + 1);
}
