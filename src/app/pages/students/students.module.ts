import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableStudentsComponent } from './components/available-students/available-students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ShortlistedStudentsComponent } from './components/shortlisted-students/shortlisted-students.component';
import { LayoutComponent } from './layout/layout.component';
import { AttendedInterviewStudentsComponent } from './components/attended-interview-students/attended-interview-students.component';
import { PlacedStudentsComponent } from './components/placed-students/placed-students.component';
import { AllStudentsComponent } from './components/all-students/all-students.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'available-students', pathMatch: 'full' },
      { path: 'available-students', component: AvailableStudentsComponent, data: { title: 'Available Students' } },
      { path: 'shortlisted-students', component: ShortlistedStudentsComponent, data: { title: 'Shortlisted Students' } },
      { path: 'attended-interview-students', component: AttendedInterviewStudentsComponent, data: { title: 'Attended Interview Students' } },
      { path: 'placed-students', component: PlacedStudentsComponent, data: { title: 'Placed Students' } },
      { path: 'all-students', component: AllStudentsComponent, data: { title: 'All Students' } }
    ]
  }
];

@NgModule({
  declarations: [
    AvailableStudentsComponent,
    ShortlistedStudentsComponent,
    LayoutComponent,
    AttendedInterviewStudentsComponent,
    PlacedStudentsComponent,
    AllStudentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentsModule { }
