import { Component } from '@angular/core';
import { DefaultRendererComponent } from '@ui/renderer/default-renderer';

@Component({
	selector: 'app-string-renderer',
	imports: [],
	templateUrl: './string-renderer.html',
	styleUrl: './string-renderer.scss'
})
export class StringRendererComponent extends DefaultRendererComponent<string> {
	public constructor() {
		super();
	}
}
