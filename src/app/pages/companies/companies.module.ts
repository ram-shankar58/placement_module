import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompaniesLayoutComponent } from './layout/companies-layout/companies-layout.component';
import { ActiveCompaniesComponent } from './components/active-companies/active-companies.component';
import { ArchivedCompaniesComponent } from './components/archived-companies/archived-companies.component';

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
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CompaniesModule { }
