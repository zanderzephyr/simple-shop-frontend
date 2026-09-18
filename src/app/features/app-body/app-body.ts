import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyContentComponent } from './body-content/body-content';

// TODO Refactor using Angular Sidenav components
@Component({
	selector: 'app-body',
	imports: [BodyContentComponent, RouterOutlet],
	templateUrl: './app-body.html',
	styleUrl: './app-body.scss'
})
export class AppBodyComponent {
	constructor() {
		// nothing to do so far
	}
}
