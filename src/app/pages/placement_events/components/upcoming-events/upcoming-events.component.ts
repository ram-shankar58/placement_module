import { Component, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PlacementEventsSandbox } from '../../placement_events.sandbox';
import { CompaniesService } from '../../../companies/companies.service';
import { GlobalFilterPipe } from '../../../../shared/components/searchfilter/global-filter.pipe';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-upcoming-events',
  standalone: false,
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class UpcomingEventsComponent implements OnInit, OnDestroy {
  issidebarvisible = false;
  submitted = false;
  addEventForm!: FormGroup;
  EventsList: any[] = [];
  selectedEvent: any = null;
  private subscriptions: Subscription[] = [];
  showClock = false;
  companySearch: string = '';
  filteredCompanies: any[] = [];
  showCompanyDropdown = false;
  selectedCompanies: any[]= [];
  companiesList: any[] =[];
  eventSearch: string = '';
  sortDropdownOpen = false;
  sortOption: string= 'recent';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public eventsSandbox: PlacementEventsSandbox,
    private elRef: ElementRef,
    private companiesService: CompaniesService,
    private globalFilterPipe: GlobalFilterPipe
  ) {}

  coursesList = [
  'Mechanical',
  'CIVIL',
  'EEE',
  'ECE',
  'CSE',
  'IT'
];

getFilteredEligibleCourses(event: any): string[] {
  return (event.eligibleCourses || []).filter((c: any) => !!c);
}

getFilteredSelectionProcess(event: any): string[] {
  return(event.selectionProcess || []).filter((s:any) => !!s);
}
  ngOnInit(): void {
  this.initAddEventForm();
  this.eventsSandbox.placementEventsList();
  this.subscriptions.push(
    this.eventsSandbox.placementEventsList$.subscribe(data => {
      if (data && data.status === true && Array.isArray(data.data)) {
        this.EventsList = data.data.map((event: any) => ({
          id: event.eventId,
          eventTitle: event.eventTitle,
          aboutEvent: event.eventAbout,
          modeOfEvent: event.eventMode,
          eventDate: event.eventDate
            ? event.eventDate.split('/').reverse().join('-')
            : '',
          eventTime: event.eventTime ? event.eventTime.substring(0, 5) : '',
          venue: event.eventVenue,
          companyDetails: event.eventCompanyDetails || [],
          eligibleCourses: event.eventEligibleCourse
            ? event.eventEligibleCourse.replace(/[{}]/g, '').split(',').map((c: string) => c.trim())
            : [],
          eligibleCriteria: event.eventEligibleCriteria,
          selectionProcess: event.eventSelectionProcess
            ? event.eventSelectionProcess.replace(/[{}"]/g, '').split(',').map((s: string) => s.trim())
            : [],
          status: 'sent'
        }));
      } else {
        this.EventsList = [];
      }
    })
  );
  this.companiesService.companiesList().subscribe(res =>{
    console.log('Companies API Response:', res);
    if(res && res.status && Array.isArray(res.data)){
      this.companiesList=res.data;
      console.log('Companies List:', this.companiesList);
    }
    else{
      console.warn('Companies not loaded or API Eerror:', res);
    }
  })
}


selectedCourses: string[] = [];
showCourseDropdown = false;

toggleCourseDropdown() {
  this.showCourseDropdown = !this.showCourseDropdown;
}

closeCourseDropdown() {
  setTimeout(() => this.showCourseDropdown = false, 200); // small delay to register click
}

dropdownOpen = false;

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

closeDropdown() {
  this.dropdownOpen = false;
}

onCourseCheckboxChange(course: string, event: Event) {
  const input = event.target as HTMLInputElement;
  const checked = input.checked;

  if (checked) {
    if (!this.selectedCourses.includes(course)) {
      this.selectedCourses.push(course);
    }
  } else {
    this.selectedCourses = this.selectedCourses.filter(c => c !== course);
  }

  this.addEventForm.get('eligibleCourses')?.setValue(this.selectedCourses);
}


  onCompanySearch() {
  this.showCompanyDropdown = true;
  console.log('companiesList:', this.companiesList);
  console.log('selectedCompanies:', this.selectedCompanies);

  if (!this.companySearch) {
    this.filteredCompanies = [];
    return;
  }

  const search = this.companySearch.trim().toLowerCase();

  const unselectedCompanies = this.companiesList
    .filter(c => c.companyName)
    .filter(c =>
      !this.selectedCompanies.some(sel =>
        sel.companyName && sel.companyName.toLowerCase() === c.companyName.toLowerCase()
      )
    );

  this.filteredCompanies = unselectedCompanies.filter(c =>
    c.companyName.toLowerCase().includes(search)
  );

  console.log('Filtered Companies:', this.filteredCompanies);
}

  selectCompany(company: any){
    this.selectedCompanies.push({ companyName: company.companyName, logo: company.logo});
    this.companySearch = '';
    this.filteredCompanies = [];
    this.showCompanyDropdown = false;
    this.updateCompanyDetailsForm();
  }
  updateCompanyDetailsForm(){
    this.addEventForm.get('companyDetails')?.setValue(this.selectedCompanies);
  }
  removeCompany(company: any){
    this.selectedCompanies = this.selectedCompanies.filter( c => c.companyName !== company.companyName);
    this.updateCompanyDetailsForm();
  }
  addCompanyFromInput(){
    if(this.companySearch && !this.selectedCompanies.some( c=> c.companyName === this.companySearch)){
      this.selectedCompanies.push({ companyName: this.companySearch, logo: ' '});
      this.companySearch = '';
      this.filteredCompanies = [];
      this.showCompanyDropdown = false;
      this.updateCompanyDetailsForm();
    }
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
      eligibleCourses: [[]],
      eligibleCriteria: [''],
      selectionProcess: [[]]
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
  let rounds: string[] = Array.isArray(roundsControl.value) ? roundsControl.value : [];
  if (event.target.checked) {
    if (!rounds.includes(round)) {
      rounds.push(round);
    }
  } else {
    rounds = rounds.filter(r => r !== round);
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
      eventDate: formattedDate,
      companyDetails: Array.isArray(formValue.companyDetails) ? formValue.companyDetails : [],
  eligibleCourses: Array.isArray(formValue.eligibleCourses) ? formValue.eligibleCourses : [],
  selectionProcess: Array.isArray(formValue.selectionProcess) ? formValue.selectionProcess : []
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

  setSort(option: string) {
    this.sortOption = option;
    this.sortDropdownOpen = false;
  }

  get sortedEvents() {
    let events = [...this.EventsList];
    switch (this.sortOption) {
      case 'name':
        events.sort((a, b) => (a.eventTitle || '').localeCompare(b.eventTitle || ''));
        break;
      case 'date':
        events.sort((a, b) => (a.eventDate || '').localeCompare(b.eventDate || ''));
        break;
      case 'type':
        events.sort((a, b) => (a.modeOfEvent || '').localeCompare(b.modeOfEvent || ''));
        break;
      case 'recent':
      default:
        events = events.reverse(); // Assuming most recent is last in the array
        break;
    }
    return events;
  }
}