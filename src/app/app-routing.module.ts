import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONTAINERS } from './common/layout/layout.module'

const routes: Routes = [
  {
    path: '',
    component: CONTAINERS.LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'placementEvents',
        loadChildren: () => import('./pages/placement_events/placement-events.module').then(m => m.PlacementEventsModule)
      },
      {
        path: 'companies',
        loadChildren: () => import('./pages/companies/companies.module').then(m => m.CompaniesModule)
      },
      {
        path: 'students',
        loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule)
      }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
