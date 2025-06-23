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
  selectedEvent: any = null;

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
      eventTitle: ['', Validators.required], // eventName -> eventTitle
      aboutEvent: [''], // eventDescription -> aboutEvent
      companyDetails: [[]], // unchanged
      eventDate: ['', Validators.required], // startDate -> eventDate
      eventTime: ['', [this.timeValidation]], // startTime -> eventTime
      venue: [''], // unchanged
      modeOfEvent: [''], // mode -> modeOfEvent
      eligibleCourses: [''], // unchanged
      eligibleCriteria: [''], // eligibilityCriteria -> eligibleCriteria
      selectionProcess: [''] // rounds -> selectionProcess
    });
  }
  // Update all references to match new field names
  onRoundCheckboxChange(event: any, round: string): void {
    const roundsControl = this.addEventForm.get('selectionProcess');
    if (!roundsControl) return;
    let rounds: string = roundsControl.value || '';
    if (event.target.checked) {
      if (!rounds.includes(round)) {
        rounds += round;
      }
    } else {
      rounds = rounds.replace(round, '');
    }
    roundsControl.setValue(rounds);
    console.log('Updated selectionProcess:', rounds);
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

  //for datatype and value debugging
  const formvalue=this.addEventForm.value;
  Object.keys(formvalue).forEach(key=>{
    const value=formvalue[key];
    const type = value === null ? null : value.constructor? value.constructor.name: typeof value;
    console.log(`key: ${key}, value: ${value}, type: ${type}`);
  });
}

  openEventDetails(event: any){
      this.selectedEvent = event;
  }
    
  closeEventDetails(){
      this.selectedEvent=null;
  }


  loadEventsList(){
    this.EventsList = [
  {
    id: 'EVT001',
    eventTitle: 'Campus Recruitment Drive – Java Architects',
    aboutEvent: 'A recruitment drive for Java Architects.',
    eventDate: '2025-07-10',
    eventTime: '10:00',
    venue: 'Main Auditorium, ABC Engineering College',
    companyDetails: [
      { name: 'Johnson & Johnson', logo: 'assets/icons/johnson.png' },
      { name: 'Adidas', logo: 'assets/icons/adidas.png' },
      { name: 'Tata Group', logo: 'assets/icons/TCS.png' },
      { name: 'Apple', logo: 'assets/icons/apple.png' },
    ],
    modeOfEvent: 'on-campus',
    eligibleCourses: ['B.E CSE', 'B.Tech IT'],
    eligibleCriteria: 'CGPA > 7, No standing arrears',
    selectionProcess: '123',
    status: 'not_sent'
  },
  {
    id: 'EVT002',
    eventTitle: 'Mega Placement Fair',
    aboutEvent: 'A mega placement fair for multiple companies.',
    eventDate: '2025-08-05',
    eventTime: '09:00',
    venue: 'Convention Center, XYZ University',
    companyDetails: [
      { name: 'Google', logo: 'assets/icons/google-icon.png' },
      { name: 'Dell', logo: 'assets/icons/dell.png' }
    ],
    modeOfEvent: 'pool',
    eligibleCourses: ['B.E ECE', 'B.Tech ME'],
    eligibleCriteria: 'CGPA > 6.5, Max 1 standing arrear',
    selectionProcess: '123',
    status: 'sent'
  },
  {
    id: 'EVT003',
    eventTitle: 'Mega Placement Fair',
    aboutEvent: 'A mega placement fair for multiple companies.',
    eventDate: '2025-08-05',
    eventTime: '09:00',
    venue: 'Convention Center, XYZ University',
    companyDetails: [
      { name: 'Google', logo: 'assets/icons/google-icon.png' },
      { name: 'Dell', logo: 'assets/icons/dell.png' }
    ],
    modeOfEvent: 'pool',
    eligibleCourses: ['B.E ECE', 'B.Tech ME'],
    eligibleCriteria: 'CGPA > 6.5, Max 1 standing arrear',
    selectionProcess: '23',
    status: 'sent'
  }
];



  }
}
