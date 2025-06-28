import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';

import { RouterModule, Routes } from '@angular/router';
import { ActiveTrainingsComponent } from './components/active-trainings/active-trainings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LayoutComponent } from './layout/layout/layout.component';
import { HistoricalTrainingsComponent } from './components/historical-trainings/historical-trainings.component';

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
    HistoricalTrainingsComponent
],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    
  ]
})
export class CareerTrainingsModule { }