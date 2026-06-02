import { Component } from '@angular/core';
import { DefaultRenderer } from '../default-renderer';

@Component({
  selector: 'app-number-renderer',
  imports: [],
  templateUrl: './number-renderer.html',
  styleUrl: './number-renderer.css',
})
export class NumberRendererComponent extends DefaultRenderer<number> {
  public constructor() {
    super();
  }
}
