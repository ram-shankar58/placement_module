import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PlacementEventsSandbox } from '../../placement_events.sandbox'; 
@Component({
  
  selector: 'app-upcoming-events',
  standalone : false,
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  issidebarvisible = false;
  submitted = false;
  addEventForm:any = FormGroup;
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
      eventName: new FormControl('', Validators.required),
      eventType: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      venue: new FormControl('', Validators.required),
      mode: new FormControl('', Validators.required),
      eligibleCourses: new FormControl('', Validators.required),
      eligibilityCriteria: new FormControl(''),
      selectionProcess: new FormControl([]),
      aptitudeRound: new FormControl(false),
      technicalRound: new FormControl(false),
      hrRound: new FormControl(false)
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

  addEvent() {
    this.submitted = true;
    const param = this.addEventForm.value;
    this.eventsSandbox.addPlacementEvents(param);

    this.subscriptions.push(
      this.eventsSandbox.addPlacementEvents$.subscribe(data => {
        if (data?.status === 'true') {
          this.toastr.success('Event added successfully');
          this.addEventForm.reset();
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
