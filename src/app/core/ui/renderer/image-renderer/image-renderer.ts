import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DefaultRendererComponent } from '@ui/renderer/default-renderer';
import { ImageRendererConfiguration } from './image-renderer-configuration';

@Component({
	selector: 'app-image-renderer',
	imports: [MatTooltipModule],
	templateUrl: './image-renderer.html',
	styleUrl: './image-renderer.scss'
})
export class ImageRendererComponent extends DefaultRendererComponent<ImageRendererConfiguration> {
	constructor() {
		super();
	}
}
