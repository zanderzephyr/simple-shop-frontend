import { Component } from '@angular/core';
import { HeaderSearchBarComponent } from './header-search-bar/header-search-bar';
import { HeaderCompanyLogoComponent } from './header-company-logo/header-company-logo';
import { HeaderSessionComponent } from './header-session/header-session';

@Component({
	selector: 'app-header',
	imports: [HeaderSessionComponent, HeaderCompanyLogoComponent, HeaderSearchBarComponent],
	templateUrl: './app-header.html',
	styleUrl: './app-header.scss'
})
export class AppHeaderComponent {
	constructor() {
		// Nothing to do so far
	}
}
