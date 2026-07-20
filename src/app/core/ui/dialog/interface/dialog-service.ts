import { DialogReference } from './dialog-reference';
import { DialogConfig } from './dialog-config';
import { Injectable } from '@angular/core';
import { GeneralDialogComponent } from '@app/core/ui/dialog/general-dialog/general-dialog';
import { InfoDialogContentData } from '@ui/dialog/message-dialog/info-dialog/info-dialog-content-data';
import { WarningDialogContentData } from '@ui/dialog/message-dialog/warning-dialog/warning-dialog-content-data';
import { ErrorDialogContentData } from '@ui/dialog/message-dialog/error-dialog/error-dialog-content-data';
import { MessageDialogContentData } from '@ui/dialog/message-dialog/message-dialog-content-data';
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
  configurer?: Consumer<DialogConfig<InfoDialogContentData, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  return openDialog(dialogService, message, InfoDialogContentData, configurer);
}

export function openWarningDialog(
  dialogService: DialogService,
  message: string,
  configurer?: Consumer<DialogConfig<WarningDialogContentData, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  return openDialog(dialogService, message, WarningDialogContentData, configurer);
}

export function openErrorDialog(
  dialogService: DialogService,
  message: string,
  configurer?: Consumer<DialogConfig<ErrorDialogContentData, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  return openDialog(dialogService, message, ErrorDialogContentData, configurer);
}

function openDialog<DATA extends MessageDialogContentData<any>>(
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
