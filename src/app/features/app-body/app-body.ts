import { AppBodySidebarComponent } from './app-body-sidebar/app-body-sidebar';
import { AppBodyContentComponent } from './app-body-content/app-body-content';
import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  imports: [RouterOutlet, AppBodySidebarComponent, AppBodyContentComponent],
  templateUrl: './app-body.html',
  styleUrl: './app-body.css',
})
export class AppBodyComponent {
  protected readonly sidebarVisible: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {}
}
