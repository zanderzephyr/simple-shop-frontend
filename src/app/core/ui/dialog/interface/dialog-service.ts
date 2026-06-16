import { DialogReference } from './dialog-reference';
import { DialogConfig } from './dialog-config';
import { Injectable } from '@angular/core';
import { GeneralDialogContentComponent } from '@ui/dialog/general-dialog-content/general-dialog-content';
import { InfoDialogContentData } from '@ui/dialog/message-dialog/info-dialog/info-dialog-content-data';
import { MessageDialogResult } from '@ui/dialog/message-dialog/message-dialog-result';
import { Consumer } from '@utils/functional-interfaces';

@Injectable()
export abstract class DialogService {
  public constructor() {}

  public abstract open<DATA, RESULT>(config: DialogConfig<DATA, RESULT>): DialogReference<RESULT>;
}

export function openInfoDialog(
  dialogService: DialogService,
  message: string,
  configurer?: Consumer<DialogConfig<InfoDialogContentData, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  const dialogContentData = new InfoDialogContentData(message);

  const dialogConfiguration = new DialogConfig<InfoDialogContentData, MessageDialogResult>(
    dialogContentData,
    GeneralDialogContentComponent,
  );

  if (configurer) {
    configurer(dialogConfiguration);
  }

  const dialogReference = dialogService.open(dialogConfiguration);

  return dialogReference;
}
