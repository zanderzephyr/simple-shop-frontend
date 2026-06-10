import { DialogReference } from './dialog-reference';
import { DialogResult } from './dialog-result';
import { DialogConfig } from './dialog-config';
import { DialogContent } from './dialog-content';
import { Injectable } from '@angular/core';

let INSTANCE: DialogService | undefined = undefined;

@Injectable()
export abstract class DialogService {
  public constructor() {
    if (INSTANCE) {
      throw new Error(
        'Instantiation failed: ' +
          DialogService.name +
          ' is a singleton managed by the framework. Manual creation or re-providing is forbidden.',
      );
    } else {
      INSTANCE = this;
    }
  }

  public abstract open<
    RESULT extends DialogResult,
    CONTENT extends DialogContent<RESULT>,
    CONFIG extends DialogConfig<CONTENT, any>,
  >(config: CONFIG): DialogReference<RESULT>;
}
