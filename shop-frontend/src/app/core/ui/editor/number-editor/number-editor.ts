import { Component } from '@angular/core';
import { DefaultEditor } from '@ui/editor/default-editor';

@Component({
  selector: 'app-number-editor',
  imports: [],
  templateUrl: './number-editor.html',
  styleUrl: './number-editor.css',
})
export class NumberEditorComponent extends DefaultEditor<number> {
  public constructor() {
    super();
  }
}
