import { Component } from '@angular/core';

/*
 * TODO Request health state from backend every x seconds and automatically
 * redirect clients back to the welcome page on healthy state.
 */
@Component({
  selector: 'app-outage',
  imports: [],
  templateUrl: './outage.html',
  styleUrl: './outage.css',
})
export class OutageComponent {
  public constructor() {
    // Nothing to do so far
  }
}
