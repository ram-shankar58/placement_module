import { Component } from '@angular/core';

@Component({
  selector: 'app-active-trainings',
  standalone: false,
  templateUrl: './active-trainings.component.html',
  styleUrls: ['./active-trainings.component.scss']
})
export class ActiveTrainingsComponent {
  issidebarvisible = false;
  recurring? = false;
  searchTerm = '';
  // ...existing code...
trainings = [
  {
    date: new Date(2024, 4, 12),
    type: 'Soft Skills',
    title: 'Resume Building Workshop',
    description: 'Learn to craft ATS-friendly resumes tailored for top companies.',
    mode: 'On-campus',
    venue: 'Seminar Hall, ABC Engineering College',
    startTime: '10:00',
    endTime: '12:00',
    batches: '2024, 2025',
    trainer: 'Arvind Kumar',
    recurring: true // <-- add this
  },
  {
    date: new Date(2024, 4, 16),
    type: 'Group Discussion (GD)',
    title: 'Inceptos',
    description: 'Maui he tatai hei whakamanaahia i na oke pukenga...',
    mode: 'Virtual',
    venue: 'Lacinia aliquam convallis',
    startTime: '10:00',
    endTime: '12:00',
    batches: '2024, 2025',
    trainer: 'Arvind Kumar',
    recurring: false // <-- add this
  },
  // ...repeat for other trainings...
];
// ...existing code...

  toggleSidebar() {
    this.issidebarvisible = !this.issidebarvisible;
  }
}