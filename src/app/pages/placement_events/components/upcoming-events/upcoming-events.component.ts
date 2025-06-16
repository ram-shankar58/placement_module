import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PlacementEventsSandbox } from '../../placement_events.sandbox'; 
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';



@Component({
  
  selector: 'app-upcoming-events',
  standalone : false,
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  issidebarvisible = false;
  submitted = false;
  addEventForm!: FormGroup;
  EventsList: any[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public eventsSandbox: PlacementEventsSandbox
  ) {}

  ngOnInit() {
    this.initAddEventForm();
    this.loadEventsList();
  }

  initAddEventForm() {
    this.addEventForm = this.fb.group({
    eventName: ['', Validators.required],
    eventDescription: [''],
    companyDetails: [[]],
    startDate: ['', Validators.required],
    startTime: ['', [this.timeValidation]],  // ✅ Correctly wrapped in array
    venue: [''],
    mode: [''],
    eligibleCourses: [''],
    eligibilityCriteria: [''],
    aptitudeRound: [false],
    technicalRound: [false],
    hrRound: [false]
});

  }

  toggleSidebar() {
     console.log('Toggling sidebar. Was:', this.issidebarvisible);
    this.issidebarvisible = !this.issidebarvisible
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideNav = target.closest('.sidebar');
    const clickedInsideBtn = target.closest('.add-btn');
    if (!clickedInsideNav && !clickedInsideBtn) {
      this.issidebarvisible = false;
    }
  }


  timeValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const time = control.value;
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!time) return null;
    return regex.test(time) ? null : { invalidTime: true };
  };


  addEvent() {
  this.submitted = true;

  if (this.addEventForm.invalid) {
    this.toastr.error('Please fill in all required fields.');
    return;
  }

  const param = this.addEventForm.value;
  this.eventsSandbox.addPlacementEvents(param);

  this.subscriptions.push(
    this.eventsSandbox.addPlacementEvents$.subscribe(data => {
      if (data?.status === 'true') {
        this.toastr.success('Event added successfully');
        this.addEventForm.reset();
        this.submitted = false;
        this.issidebarvisible = false;
      }
    })
  );
}


  loadEventsList() {
    this.EventsList = [
      {
        name: 'Infosys Placement Drive',
        type: 'On-Campus',
        startDate: '2025-07-10',
        venue: 'Auditorium',
        company: 'Infosys'
      },
      {
        name: 'TCS NQT',
        type: 'Virtual',
        startDate: '2025-07-15',
        venue: 'Online',
        company: 'TCS'
      }
    ];
  }
}
