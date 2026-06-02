import { Component } from '@angular/core';
import { DefaultEditor } from '../default-editor';

@Component({
  selector: 'app-string-editor',
  imports: [],
  templateUrl: './string-editor.html',
  styleUrl: './string-editor.css',
})
export class StringEditorComponent extends DefaultEditor<string> {
  public constructor() {
    super();
  }
}
