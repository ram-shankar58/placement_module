import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { ActiveTrainingsComponent } from './components/active-trainings/active-trainings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LayoutComponent } from './layout/layout/layout.component';
import { HistoricalTrainingsComponent } from './components/historical-trainings/historical-trainings.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTimepickModule} from 'ng-timepick';
import { careerTrainingsSandbox } from './career_trainings.sandbox';
import { CareerTrainingsService } from './career_trainings.service';
import { CareerTrainingsEffect } from './effects/career-trainings.effects';

const routes: any = [
  { path: '', component: LayoutComponent,
    children: [
        {
            path: 'historical-trainings',
            component: HistoricalTrainingsComponent,
            data: {
                title: 'historical-trainings',
            }
        },
        {
            path: 'active-trainings',
            component: ActiveTrainingsComponent,
            data:{
                title: 'active-trainings',
            }
        },
        {
            path: '',
            redirectTo: 'active-trainings',
            pathMatch: 'full'
        },
    ]
   }
];

@NgModule({
  declarations: [
    ActiveTrainingsComponent,
    LayoutComponent,
    HistoricalTrainingsComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgTimepickModule, //The same custom-timepicker module has been imported here after publishing. //
    // This is because, importing the same component already imported elsewhere is not allowed.
    EffectsModule.forFeature([CareerTrainingsEffect]),
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    careerTrainingsSandbox,
    CareerTrainingsService

  ]
})
export class CareerTrainingsModule { }