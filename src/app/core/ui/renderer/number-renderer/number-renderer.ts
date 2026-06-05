import { Component } from '@angular/core';
import { DefaultRenderer } from '@core/ui/renderer/default-renderer';

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
