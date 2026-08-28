import { MatDialogConfig } from '@angular/material/dialog';
import { DialogConfig } from '@ui/dialog/interface/dialog-config';

/**
 * Only to be used by the NgMatDialogService.
 */
export function mapToNgMatConfig<DATA, RESULT, CONFIG extends DialogConfig<DATA, RESULT>>(
	config: CONFIG
): MatDialogConfig<DATA> {
	const ngMatDialogConfig: MatDialogConfig<DATA> = new MatDialogConfig<DATA>();

	ngMatDialogConfig.width = config.getWidth();
	ngMatDialogConfig.height = config.getHeight();
	ngMatDialogConfig.disableClose = config.getDisableClose();
	ngMatDialogConfig.restoreFocus = config.getRestoreFocus();

	// TODO Extend as DialogConfig grows

	return ngMatDialogConfig;
}
