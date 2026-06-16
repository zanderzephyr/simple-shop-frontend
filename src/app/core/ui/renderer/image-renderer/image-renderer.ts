import { Component } from '@angular/core';
import { DefaultRendererComponent } from '@ui/renderer/default-renderer';
import { ImageRendererConfiguration } from './image-renderer-configuration';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-image-renderer',
  imports: [MatTooltipModule],
  templateUrl: './image-renderer.html',
  styleUrl: './image-renderer.css',
})
export class ImageRendererComponent extends DefaultRendererComponent<ImageRendererConfiguration> {
  constructor() {
    super();
  }
}
