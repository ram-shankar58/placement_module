import { Component, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PlacementEventsSandbox } from '../../placement_events.sandbox';

@Component({
  selector: 'app-upcoming-events',
  standalone: false,
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit, OnDestroy {
  issidebarvisible = false;
  submitted = false;
  addEventForm!: FormGroup;
  EventsList: any[] = [];
  selectedEvent: any = null;
  private subscriptions: Subscription[] = [];
  showClock = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public eventsSandbox: PlacementEventsSandbox,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.initAddEventForm();
    // Fetch events from backend/store
    this.eventsSandbox.placementEventsList();
    // Subscribe to placementEventsList$ observable
    this.subscriptions.push(
      this.eventsSandbox.placementEventsList$.subscribe(data => {
        if (data && data.status === true && Array.isArray(data.data)) {
          this.EventsList = data.data;
        } else {
          this.EventsList = [];
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initAddEventForm(): void {
    this.addEventForm = this.fb.group({
      eventTitle: ['', Validators.required],
      aboutEvent: [''],
      companyDetails: [[]],
      eventDate: [null, Validators.required],
      eventTime: ['', [this.timeValidation]],
      venue: [''],
      modeOfEvent: [''],
      eligibleCourses: [''],
      eligibleCriteria: [''],
      selectionProcess: ['']
    });
  }

  toggleSidebar(): void {
    this.issidebarvisible = !this.issidebarvisible;
  }

  cancel(): void {
    this.issidebarvisible = false;
    this.addEventForm.reset();
    this.submitted = false;
    this.selectedEvent = null;
  }

  onRoundCheckboxChange(event: any, round: string): void {
    const roundsControl = this.addEventForm.get('selectionProcess');
    if (!roundsControl) return;
    let rounds: string = roundsControl.value || '';
    if (event.target.checked && !rounds.includes(round)) {
      rounds += round;
    } else {
      rounds = rounds.replace(round, '');
    }
    roundsControl.setValue(rounds);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideSidebar = this.elRef.nativeElement.contains(target);
    const clickedInsideOverlay = !!target.closest('.cdk-overlay-container');
    const clickedInsideDatepicker = !!target.closest('ngb-datepicker') || !!target.closest('.ngb-dp-container');
    if (!clickedInsideSidebar && !clickedInsideOverlay && !clickedInsideDatepicker) {
      this.issidebarvisible = false;
    }
  }

  onTimeSelected(time: string) {
    this.addEventForm.get('eventTime')?.setValue(time);
    this.showClock = false;
  }

  timeValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const time = control.value;
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!time) return null;
    return regex.test(time) ? null : { invalidTime: true };
  };

  addEvent(): void {
    this.submitted = true;
    if (this.addEventForm.invalid) {
      this.toastr.error('Please fill in all required fields.');
      return;
    }
    const formValue = this.addEventForm.value;
    // Format eventDate if needed
    let formattedDate = formValue.eventDate;
    if (formValue.eventDate && formValue.eventDate.year) {
      const { year, month, day } = formValue.eventDate;
      formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
    const param = {
      ...formValue,
      eventDate: formattedDate
    };
    this.eventsSandbox.addPlacementEvents(param);
    // Listen for add event response and refresh list on success
    this.subscriptions.push(
      this.eventsSandbox.addPlacementEvents$.subscribe(data => {
        if (data?.status === 'true') {
          this.toastr.success('Event added successfully');
          this.addEventForm.reset();
          this.submitted = false;
          this.issidebarvisible = false;
          this.eventsSandbox.placementEventsList(); // Refresh list after add
        }
      })
    );
  }

  openEventDetails(event: any): void {
    this.selectedEvent = event;
  }

  closeEventDetails(): void {
    this.selectedEvent = null;
  }
}