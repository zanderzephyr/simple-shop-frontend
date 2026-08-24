import { Component } from '@angular/core';

/*
 * TODO Request health state from backend every x seconds and automatically
 * redirect clients back to the welcome page on healthy state.
 *
 * TODO This component is currently not properly displayed. Deal with the
 * workflow issues here, when there's time.
 *
 * TODO Maybe place a button on this component to return to the landing page.
 */
@Component({
  selector: 'app-outage',
  imports: [],
  templateUrl: './outage.html',
  styleUrl: './outage.scss',
})
export class OutageComponent {
  public constructor() {
    // Nothing to do so far
  }
}
