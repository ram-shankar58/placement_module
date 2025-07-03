import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacementEventsSandbox } from '../placement_events.sandbox';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  EventsList: any[] = [];

  constructor(public eventsSandbox: PlacementEventsSandbox) {}

  ngOnInit() {
    this.eventsSandbox.placementEventsList$.subscribe((events: any) => {
      if (events && events.status === true && Array.isArray(events.data)) {
        this.EventsList = events.data;
      } else {
        this.EventsList = [];
      }
    });
  }
}
