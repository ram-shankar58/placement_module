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
import { exitCode } from 'process';
import { EffectsModule } from '@ngrx/effects';
import { PlacementEventsEffect } from './effects/placement-events.effects';
import { PlacementEventsService } from './placement-events.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

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
          // urls: [{ title: 'Home' }, { title: 'Placement events' }, { title: 'Historical' }]
        }
      },
      {
        path: 'upcoming-events',
        component: UpcomingEventsComponent,
        data: {
          title: 'upcoming-events',
          // urls: [{ title: 'Home' }, { title: 'Placement events' }, { title: 'Upcoming' }]
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
    
    NgSelectModule,
    NgbModalModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forFeature([PlacementEventsEffect]),
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  providers: [
    PlacementEventsSandbox,
    PlacementEventsService
  ]
})
export class PlacementEventsModule { }
