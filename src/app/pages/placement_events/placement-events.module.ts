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
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomTimepickerComponent } from './components/custom-timepicker/custom-timepicker.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { CompaniesService } from '../companies/companies.service';
import { GlobalFilterPipe } from '../../shared/components/searchfilter/global-filter.pipe';
import { ClickOutsideDirective } from './components/upcoming-events/click-outside-directive';

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
    CustomTimepickerComponent,
    ClickOutsideDirective
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgbDatepickerModule,
    NgSelectModule,
    NgbModalModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forFeature([PlacementEventsEffect]),
    MatSelectModule,
    MatChipsModule
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  providers: [
    PlacementEventsSandbox,
    PlacementEventsService,
    CompaniesService,
    GlobalFilterPipe
  ]
})
export class PlacementEventsModule { }
