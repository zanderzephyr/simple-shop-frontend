import { BodySidebarComponent } from './body-sidebar/body-sidebar';
import { BodyContentComponent } from './body-content/body-content';
import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// TODO Refactor using Angular Sidenav components
@Component({
  selector: 'app-body',
  imports: [BodySidebarComponent, BodyContentComponent, RouterOutlet],
  templateUrl: './app-body.html',
  styleUrl: './app-body.css',
})
export class AppBodyComponent {
  protected readonly sidebarVisible: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    // nothing to do so far
  }
}
