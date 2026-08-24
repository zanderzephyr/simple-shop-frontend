import { Component } from '@angular/core';
import { DefaultRendererComponent } from '@ui/renderer/default-renderer';

@Component({
  selector: 'app-number-renderer',
  imports: [],
  templateUrl: './number-renderer.html',
  styleUrl: './number-renderer.scss',
})
export class NumberRendererComponent extends DefaultRendererComponent<number> {
  public constructor() {
    super();
  }
}
