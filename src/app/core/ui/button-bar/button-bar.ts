import { Component, input, InputSignal } from '@angular/core';
import { ButtonBarConfiguration } from './button-bar-configuration';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-button-bar',
	imports: [MatButtonModule],
	templateUrl: './button-bar.html',
	styleUrl: './button-bar.scss'
})
export class ButtonBarComponent {
	public readonly config: InputSignal<ButtonBarConfiguration> =
		input.required<ButtonBarConfiguration>();

	public constructor() {
	}
}
