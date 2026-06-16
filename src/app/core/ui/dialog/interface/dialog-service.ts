import { DialogReference } from './dialog-reference';
import { DialogConfig } from './dialog-config';
import { Injectable } from '@angular/core';
import { GeneralDialogContentComponent } from '@ui/dialog/general-dialog-content/general-dialog-content';
import { InfoDialogContentData } from '@ui/dialog/message-dialog/info-dialog/info-dialog-content-data';
import { MessageDialogResult } from '@ui/dialog/message-dialog/message-dialog-result';
import { DefaultDialogConfig } from '@ui/dialog/default/default-dialog-config';

@Injectable()
export abstract class DialogService {
  public constructor() {}

  public abstract open<DATA, RESULT>(config: DialogConfig<DATA, RESULT>): DialogReference<RESULT>;
}

export function openInfoDialog(
  dialogService: DialogService,
  message: string,
): DialogReference<MessageDialogResult> {
  const dialogContentData = new InfoDialogContentData(message);

  const dialogConfiguration = new DefaultDialogConfig<InfoDialogContentData, MessageDialogResult>(
    dialogContentData,
    GeneralDialogContentComponent,
  );

  const dialogReference = dialogService.open(dialogConfiguration);

  return dialogReference;
}
