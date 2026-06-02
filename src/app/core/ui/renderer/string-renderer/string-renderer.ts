import { Component } from '@angular/core';
import { DefaultRenderer } from '../default-renderer';

@Component({
  selector: 'app-string-renderer',
  imports: [],
  templateUrl: './string-renderer.html',
  styleUrl: './string-renderer.css',
})
export class StringRendererComponent extends DefaultRenderer<string> {
  public constructor() {
    super();
  }
}
