import { DialogConfig } from '@ui/dialog/interface/dialog-config';
import { DialogData } from '@ui/dialog/interface/dialog-data';
import { MatDialogConfig } from '@angular/material/dialog';

/**
 * Only to be used by the NgMatDialogService.
 */
export function mapToNgMatConfig<DATA extends DialogData, CONFIG extends DialogConfig<any, DATA>>(
  config: CONFIG,
): MatDialogConfig<DATA> {
  const ngMatDialogConfig: MatDialogConfig<DATA> = new MatDialogConfig<DATA>();

  ngMatDialogConfig.width = config.getWidth();
  ngMatDialogConfig.height = config.getHeight();
  ngMatDialogConfig.disableClose = config.getDisableClose();

  // TODO Extend as DialogConfig grows

  return ngMatDialogConfig;
}
