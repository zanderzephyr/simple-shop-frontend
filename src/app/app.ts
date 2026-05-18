import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppBodyComponent } from '@features/app-body/app-body';
import { AppFooterComponent } from '@features/app-footer/app-footer';
import { AppHeaderComponent } from '@features/app-header/app-header';
import { AppSidebarComponent } from '@features/app-sidebar/app-sidebar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AppHeaderComponent,
    AppBodyComponent,
    AppFooterComponent,
    AppSidebarComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  protected readonly title = signal('SimpleShop');
}
