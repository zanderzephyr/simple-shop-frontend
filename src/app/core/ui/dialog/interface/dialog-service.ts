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

/*
Example code:
	protected async showInfoDialog(): Promise<void> {
    const dialogReference: DialogReference<MessageDialogResult> = openInfoDialog(
      this.#dialogService,
      'You are awesome!!',
      (config) => config.setDisableClose(true),
    );
    const dialogResult = await dialogReference.getResult();
    console.log(`Dialog result: ${dialogResult?.id ?? 'undefined'}`);
  }
*/
export function openInfoDialog(
  dialogService: DialogService,
  message: string,
  configurer?: Consumer<DialogConfig<InfoDialogData, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  const dialogData: InfoDialogData = new InfoDialogData(message);
  return openDialog(dialogService, dialogData, configurer);
}

/*
Example code:
	protected async showWarningDialog(): Promise<void> {
    const dialogReference: DialogReference<MessageDialogResult> = openWarningDialog(
      this.#dialogService,
      'Are you sure?!',
      (config) => config.setDisableClose(true),
    );
    const dialogResult = await dialogReference.getResult();
    console.log(`Dialog result: ${dialogResult?.id ?? 'undefined'}`);
  }
*/
export function openWarningDialog(
  dialogService: DialogService,
  message: string,
  configurer?: Consumer<DialogConfig<WarningDialogData, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  const dialogData: WarningDialogData = new WarningDialogData(message);
  return openDialog(dialogService, dialogData, configurer);
}

/*
Example code:
	protected async showErrorDialog(): Promise<void> {
    const dialogReference: DialogReference<MessageDialogResult> = openErrorDialog(
      this.#dialogService,
      'Nooo, sir!!',
      (config) => config.setDisableClose(true),
    );
    const dialogResult = await dialogReference.getResult();
    console.log(`Dialog result: ${dialogResult?.id ?? 'undefined'}`);
  }
*/
export function openErrorDialog(
  dialogService: DialogService,
  message: string,
  configurer?: Consumer<DialogConfig<ErrorDialogData, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  const dialogData: ErrorDialogData = new ErrorDialogData(message);
  return openDialog(dialogService, dialogData, configurer);
}

function openDialog<DATA extends MessageDialogData<any>>(
  dialogService: DialogService,
  dialogData: DATA,
  configurer?: Consumer<DialogConfig<DATA, MessageDialogResult>>,
): DialogReference<MessageDialogResult> {
  const dialogConfiguration = new DialogConfig<DATA, MessageDialogResult>(
    dialogData,
    GeneralDialogComponent,
  );

  if (configurer) {
    configurer(dialogConfiguration);
  }

  const dialogReference = dialogService.open(dialogConfiguration);

  return dialogReference;
}
