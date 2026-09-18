import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-body-content',
	imports: [MatButtonModule],
	templateUrl: './body-content.html',
	styleUrl: './body-content.scss'
})
export class BodyContentComponent {
	constructor() {
		// Nothing to do so far
	}
}
