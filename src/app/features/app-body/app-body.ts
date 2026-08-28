import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyContentComponent } from './body-content/body-content';
import { BodySidebarComponent } from './body-sidebar/body-sidebar';

// TODO Refactor using Angular Sidenav components
@Component({
	selector: 'app-body',
	imports: [BodySidebarComponent, BodyContentComponent, RouterOutlet],
	templateUrl: './app-body.html',
	styleUrl: './app-body.scss'
})
export class AppBodyComponent {
	protected readonly sidebarVisible: WritableSignal<boolean> = signal<boolean>(false);

	constructor() {
		// nothing to do so far
	}
}
