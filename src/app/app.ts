import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppBody } from '@features/app-body/app-body';
import { AppFooter } from '@features/app-footer/app-footer';
import { AppHeader } from '@features/app-header/app-header';
import { AppSidebar } from '@features/app-sidebar/app-sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeader, AppBody, AppFooter, AppSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('SimpleShop');
}
