import { Component } from '@angular/core';
import { DefaultEditor } from '@ui/editor/default-editor';

@Component({
  selector: 'app-string-editor',
  imports: [],
  templateUrl: './string-editor.html',
  styleUrl: './string-editor.scss',
})
export class StringEditorComponent extends DefaultEditor<string> {
  public constructor() {
    super();
  }
}
