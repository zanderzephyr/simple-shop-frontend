import { DialogReference } from './dialog-reference';
import { DialogConfig } from './dialog-config';
import { DialogContentComponent } from './dialog-content';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class DialogService {
  public constructor() {}

  public abstract open<DATA, RESULT, CONTENT extends DialogContentComponent<DATA, RESULT>>(
    config: DialogConfig<DATA, RESULT, CONTENT>,
  ): DialogReference<RESULT>;
}
