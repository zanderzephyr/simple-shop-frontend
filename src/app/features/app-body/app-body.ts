import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// TODO Refactor using Angular Sidenav components
@Component({
	selector: 'app-body',
	imports: [RouterOutlet],
	templateUrl: './app-body.html',
	styleUrl: './app-body.scss'
})
export class AppBodyComponent {
	constructor() {
		// nothing to do so far
	}
}
