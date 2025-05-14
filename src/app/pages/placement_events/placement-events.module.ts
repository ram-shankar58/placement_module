import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { HistoricalEventsComponent } from './components/historical-events/historical-events.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';

export const routes: any = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'historical-events',
        component: HistoricalEventsComponent,
        data: {
          title: 'historical-events',
          urls: [{ title: 'Home' }, { title: 'Placement events' }, { title: 'Historical' }]
        }
      },
      {
        path: 'upcoming-events',
        component: UpcomingEventsComponent,
        data: {
          title: 'upcoming-events',
          urls: [{ title: 'Home' }, { title: 'Placement events' }, { title: 'Upcoming' }]
        }
      },
      {
        path: '',
        redirectTo: 'historical-events',
        pathMatch: 'full'
      },
    ]
  }
]

@NgModule({
  declarations: [
    UpcomingEventsComponent,
    HistoricalEventsComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PlacementEventsModule { }
