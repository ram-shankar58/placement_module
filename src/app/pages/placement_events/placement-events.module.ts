import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { HistoricalEventsComponent } from './components/historical-events/historical-events.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlacementEventsSandbox } from './placement_events.sandbox';

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
        redirectTo: 'upcoming-events',
        pathMatch: 'full'
      },
    ]
  }
]

@NgModule({
  declarations: [
    HistoricalEventsComponent,
    UpcomingEventsComponent,
    LayoutComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgbModalModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  providers: [
    PlacementEventsSandbox
  ]
})
export class PlacementEventsModule { }
