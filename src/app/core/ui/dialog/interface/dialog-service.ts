import { DialogReference } from './dialog-reference';
import { DialogResult } from './dialog-result';
import { DialogData } from './dialog-data';
import { DialogConfig } from './dialog-config';
import { DialogContent } from './dialog-content';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class DialogService {
  public constructor() {}

  public abstract open<
    RESULT extends DialogResult,
    CONTENT extends DialogContent<RESULT>,
    DATA extends DialogData,
    CONFIG extends DialogConfig<CONTENT, DATA>,
  >(config: CONFIG): DialogReference<RESULT>;
}
