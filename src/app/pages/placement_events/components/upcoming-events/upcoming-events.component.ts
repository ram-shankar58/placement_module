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
