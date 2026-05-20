import { Component } from '@angular/core';
import { HeaderSearchBar } from './header-search-bar/header-search-bar';
import { HeaderCompanyLogo } from './header-company-logo/header-company-logo';
import { HeaderSession } from './header-session/header-session';

@Component({
  selector: 'app-header',
  imports: [HeaderSession, HeaderCompanyLogo, HeaderSearchBar],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeaderComponent {
  constructor() {
    // Nothing to do so far
  }
}
