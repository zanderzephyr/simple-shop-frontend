import { DialogReference } from './dialog-reference';
import { DialogConfig } from './dialog-config';
import { Injectable } from '@angular/core';
import { GeneralDialogComponent } from '@app/core/ui/dialog/general-dialog/general-dialog';
import { InfoDialogData } from '@app/core/ui/dialog/message-dialog/info-dialog/info-dialog-data';
import { WarningDialogData } from '@app/core/ui/dialog/message-dialog/warning-dialog/warning-dialog-data';
import { ErrorDialogData } from '@app/core/ui/dialog/message-dialog/error-dialog/error-dialog-data';
import { MessageDialogData } from '@app/core/ui/dialog/message-dialog/message-dialog-data';
import { MessageDialogResult } from '@ui/dialog/message-dialog/message-dialog-result';
import { Consumer } from '@core/utils/functional-interfaces';

@Injectable()
export abstract class DialogService {
  public constructor() {}

  public abstract open<DATA, RESULT>(config: DialogConfig<DATA, RESULT>): DialogReference<RESULT>;
}

export function openInfoDialog(
  dialogService: DialogService,
  message: string,
  configurer?: Consumer<DialogConfig<InfoDialogData, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  return openDialog(dialogService, message, InfoDialogData, configurer);
}

export function openWarningDialog(
  dialogService: DialogService,
  message: string,
  configurer?: Consumer<DialogConfig<WarningDialogData, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  return openDialog(dialogService, message, WarningDialogData, configurer);
}

export function openErrorDialog(
  dialogService: DialogService,
  message: string,
  configurer?: Consumer<DialogConfig<ErrorDialogData, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  return openDialog(dialogService, message, ErrorDialogData, configurer);
}

function openDialog<DATA extends MessageDialogData<any>>(
  dialogService: DialogService,
  message: string,
  dataConstructor: new (message: string) => DATA,
  configurer?: Consumer<DialogConfig<DATA, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  const dialogContentData = new dataConstructor(message);

  const dialogConfiguration = new DialogConfig<DATA, MessageDialogResult>(
    dialogContentData,
    GeneralDialogComponent,
  );

  if (configurer) {
    configurer(dialogConfiguration);
  }

  const dialogReference = dialogService.open(dialogConfiguration);

  return dialogReference;
}
