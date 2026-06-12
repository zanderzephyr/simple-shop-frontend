import { DialogReference } from './dialog-reference';
import { DialogResult } from './dialog-result';
import { DialogContentData } from './dialog-content-data';
import { DialogConfig } from './dialog-config';
import { DialogContent } from './dialog-content';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class DialogService {
  public constructor() {}

  public abstract open<
    DATA extends DialogContentData,
    RESULT extends DialogResult,
    CONTENT extends DialogContent<DATA, RESULT>,
    CONFIG extends DialogConfig<DATA, CONTENT>,
  >(config: CONFIG): DialogReference<RESULT>;
}
