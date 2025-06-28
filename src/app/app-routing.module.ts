import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONTAINERS } from './common/layout/layout.module'

const routes: Routes = [
    {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: '',
      redirectTo: 'auth',
      pathMatch: 'full'
    },

    {
      path: '',
      component: CONTAINERS.LayoutComponent,
      children: [
      {
      path: 'dashboard',
      loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'placementEvents',
        loadChildren: () => import('./pages/placement_events/placement-events.module').then(m => m.PlacementEventsModule)
      },
      { 
        path: 'careerTrainings',
        loadChildren: () => import('./pages/career_trainings/career-trainings.module').then(m=> m.CareerTrainingsModule)
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
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
   //Catch-all route
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }

  
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
