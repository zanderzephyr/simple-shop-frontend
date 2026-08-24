import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-company-logo',
  imports: [RouterLink],
  templateUrl: './header-company-logo.html',
  styleUrl: './header-company-logo.scss',
})
export class HeaderCompanyLogoComponent {
  constructor() {
    // Nothing to do so far
  }
}
