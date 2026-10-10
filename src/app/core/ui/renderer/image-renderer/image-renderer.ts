import { Component, computed, Signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DefaultRendererComponent } from '@ui/renderer/default-renderer';
import { ImageRendererConfiguration } from './image-renderer-configuration';

@Component({
	selector: 'app-image-renderer',
	imports: [MatIcon],
	templateUrl: './image-renderer.html',
	styleUrl: './image-renderer.scss'
})
export class ImageRendererComponent extends DefaultRendererComponent<ImageRendererConfiguration> {
	protected readonly imageUrl: Signal<string | undefined> = computed(() => this.value().getUrl());

	constructor() {
		super();
	}
}
