import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
    public eventsSandbox: PlacementEventsSandbox,
    private elRef: ElementRef
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
    startTime: ['', [this.timeValidation]], 
    venue: [''],
    mode: [''],
    eligibleCourses: [''],
    eligibilityCriteria: [''],
    rounds: [''] //here presence of 1 in the string represnts aptitude, 2 represents technical, 3 represents hr, more than one can be present

});

  }

  onRoundCheckboxChange(event: any, round: string): void{
    const roundsControl= this.addEventForm.get('rounds');
    if(!roundsControl) return;
    let rounds: string = roundsControl.value || '';
    if(event.target.checked){
      if(!rounds.includes(round)){
        rounds+=round;
      }
    }
    else{
      rounds=rounds.replace(round, '');
    }

    roundsControl.setValue(rounds);
    console.log('Updated rounds:', rounds);

  }
  

  toggleSidebar() {
     console.log('Toggling sidebar. Was:', this.issidebarvisible);
    this.issidebarvisible = !this.issidebarvisible
  }

  cancel(){
    this.issidebarvisible=false;
    this.addEventForm.reset();
    this.submitted= false;
    this.selectedEvent=null;

  }

  

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideSidebar = this.elRef.nativeElement.contains(target);
    const clickedInsideOverlay = !!target.closest('.cdk-overlay-container');

    if (!clickedInsideSidebar && !clickedInsideOverlay) {
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
        name: 'Campus Recruitment Drive – Java Architects',
        type: 'On-campus',
        startDate: '2025-07-10',
        time: '10:00 AM',
        venue: 'Main Auditorium, ABC Engineering College',
        companies: [
          { name: 'Johnson & Johnson', logo: 'assets/icons/johnson.png' },
          { name: 'Adidas', logo: 'assets/icons/adidas.png' },
          { name: 'Tata Group', logo: 'assets/icons/TCS.png' },
          { name: 'Apple', logo: 'assets/icons/apple.png' },
        ],
        eligibleCourses: ['B.E CSE', 'B.Tech IT'],
        eligibilityCriteria: 'CGPA > 7, No standing arrears',
        rounds: '123',
        status: 'not_sent'
      },
      
      {
      id: 'EVT002',
      name: 'Mega Placement Fair',
      type: 'Pool',
      startDate: '2025-08-05',
      time: '09:00 AM',
      venue: 'Convention Center, XYZ University',
      companies: [
        { name: 'Google', logo: 'assets/icons/google-icon.png' },
        { name: 'Dell', logo: 'assets/icons/dell.png' }
      ],
      eligibleCourses: ['B.E ECE', 'B.Tech ME'],
      eligibilityCriteria: 'CGPA > 6.5, Max 1 standing arrear',
      rounds: '123',
      status: 'sent'
    },
    {
      id: 'EVT002',
      name: 'Mega Placement Fair',
      type: 'Pool',
      startDate: '2025-08-05',
      time: '09:00 AM',
      venue: 'Convention Center, XYZ University',
      companies: [
        { name: 'Google', logo: 'assets/icons/google-icon.png' },
        { name: 'Dell', logo: 'assets/icons/dell.png' }
      ],
      eligibleCourses: ['B.E ECE', 'B.Tech ME'],
      eligibilityCriteria: 'CGPA > 6.5, Max 1 standing arrear',
      rounds: '23',
      status: 'sent'
      
    },
    {
      id: 'EVT002',
      name: 'Mega Placement Fair',
      type: 'Pool',
      startDate: '2025-08-05',
      time: '09:00 AM',
      venue: 'Convention Center, XYZ University',
      companies: [
        { name: 'Google', logo: 'assets/icons/google-icon.png' },
        { name: 'Dell', logo: 'assets/icons/dell.png' }
      ],
      eligibleCourses: ['B.E ECE', 'B.Tech ME'],
      eligibilityCriteria: 'CGPA > 6.5, Max 1 standing arrear',
      rounds: '123',
      status: 'sent'
    },
      
    ];



  }
}
