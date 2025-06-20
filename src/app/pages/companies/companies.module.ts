import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompaniesLayoutComponent } from './layout/companies-layout/companies-layout.component';
import { ActiveCompaniesComponent } from './components/active-companies/active-companies.component';
import { ArchivedCompaniesComponent } from './components/archived-companies/archived-companies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { CompaniesEffect } from './effects/companies.effect';
import { CompaniesService } from './companies.service';
import { CompaniesSanbox } from './companies.sandbox';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../shared/shared.module';




const routes:any = [
  {
    path: '',
    component: CompaniesLayoutComponent,
    children: [
      {
        path: 'active-companies',
        component: ActiveCompaniesComponent,
        data: {
          title: 'active-companies'
        }
      },
      {
        path: 'archived-companies',
        component: ArchivedCompaniesComponent,
        data: {
          title: 'archived-companies'
        }
      },
      {
        path: '',
        redirectTo: 'active-companies',
        pathMatch: 'full'
      } 
    ]
  }
]

@NgModule({
  declarations: [
    CompaniesLayoutComponent,
    ActiveCompaniesComponent,
    ArchivedCompaniesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,//not there in placement-event
    SharedModule,
    MatTooltipModule,
    EffectsModule.forFeature([CompaniesEffect])
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[
    CompaniesService,
    CompaniesSanbox
  ]
})
export class CompaniesModule { }
