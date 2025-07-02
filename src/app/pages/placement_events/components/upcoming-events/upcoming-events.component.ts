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
  skeletonCount: number[] = Array(5).fill(0);
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
  isUpdateMode = false;
  eventToUpdate: any= null;
  filterFromDate: any=null;
  filterToDate: any=null;

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
  'Civil',
  'EEE',
  'ECE',
  'CSE',
  'IT'
];

// upcoming-events.component.ts

  isFilterVisible = false;

toggleFilterPopup() {
  this.isFilterVisible = !this.isFilterVisible;
}

closeFilterPopup() {
  this.isFilterVisible = false;
}


// Filtering-related fields
filterCompanySearch = '';
filteredFilterCompanies: { companyName: string; logo: string }[] = [];
filterModes: string[] = [];

selectedFilterCompanies: { companyName: string; logo: string }[] = [];
showFilterCompanyDropdown = false;

filterCourses: string[] = [];
showFilterClock = false;

onFilterModeChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (target.checked) {
    if (!this.filterModes.includes(value)) {
      this.filterModes.push(value);
    }
  } else {
    this.filterModes = this.filterModes.filter(mode => mode !== value);
  }
}


// Company search (same as sidebar)
onFilterCompanySearch() {
  const query = this.filterCompanySearch.toLowerCase();
  this.filteredFilterCompanies = this.companiesList.filter(company =>
    company.companyName.toLowerCase().includes(query)
  );
  this.showFilterCompanyDropdown = true;
}

selectCompanyFromFilter(company: any) {
  if (!this.selectedFilterCompanies.some(c => c.companyName === company.companyName)) {
    this.selectedFilterCompanies.push(company);
  }
  this.filterCompanySearch = '';
  this.showFilterCompanyDropdown = false;
}

addCompanyFromFilter() {
  if (this.filterCompanySearch.trim()) {
    const customCompany = {
      companyName: this.filterCompanySearch.trim(),
      logo: 'assets/icons/default-company-logo.png' //change required heres
    };
    this.selectedFilterCompanies.push(customCompany);
    this.filterCompanySearch = '';
    this.showFilterCompanyDropdown = false;
  }
}

removeFilterCompany(comp: any) {
  this.selectedFilterCompanies = this.selectedFilterCompanies.filter(c => c !== comp);
}



// Eligible courses selection
onFilterCourseChange(event: any) {
  const course = event.target.value;
  if (event.target.checked) {
    this.filterCourses.push(course);
  } else {
    this.filterCourses = this.filterCourses.filter(c => c !== course);
  }
}

// Final filtered result
filteredEvents: any[] = [];

applyFilters() {
  this.filteredEvents = this.EventsList.filter(event => {
    // Company filter
    const matchesCompany =
      this.selectedFilterCompanies.length === 0 ||
      this.selectedFilterCompanies.some(comp =>
        event.companyDetails.some((ec: { companyName: string }) => ec.companyName === comp.companyName)
      );

    // Course filter
    const matchesCourse =
      this.filterCourses.length === 0 ||
      this.filterCourses.some(course => event.eligibleCourses.includes(course));

    // Date range filter (From Date to To Date)
    let matchesDate = true;
    if (this.filterFromDate && this.filterToDate) {
      // Convert filterFromDate and filterToDate (NgbDateStruct) to Date objects
      const from = new Date(this.filterFromDate.year, this.filterFromDate.month - 1, this.filterFromDate.day, 0, 0, 0);
      const to = new Date(this.filterToDate.year, this.filterToDate.month - 1, this.filterToDate.day, 23, 59, 59);
      const eventDate = new Date(event.eventDate);
      matchesDate = eventDate >= from && eventDate <= to;
    } else if (this.filterFromDate) {
      const from = new Date(this.filterFromDate.year, this.filterFromDate.month - 1, this.filterFromDate.day, 0, 0, 0);
      const eventDate = new Date(event.eventDate);
      matchesDate = eventDate >= from;
    } else if (this.filterToDate) {
      const to = new Date(this.filterToDate.year, this.filterToDate.month - 1, this.filterToDate.day, 23, 59, 59);
      const eventDate = new Date(event.eventDate);
      matchesDate = eventDate <= to;
    }

    // Mode filter
    const matchesMode =
      this.filterModes.length === 0 ||
      this.filterModes.includes(event.modeOfEvent);

    return matchesCompany && matchesCourse && matchesDate && matchesMode;
  });

  this.isFilterVisible = false;
}

// Use filteredEvents instead of EventsList in HTML ngFor
formatDate(date: any): string {
  // Handles both Date object and NgbDate format
  if (typeof date === 'object' && date.year) {
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  }
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

resetFilters() {
  this.isFilterVisible = false;
  this.filterModes = [];
  this.selectedFilterCompanies = [];
  this.filterCompanySearch = '';
  this.filterFromDate = '';
  this.filterToDate = '';
  this.filterCourses = [];
  this.filteredEvents = [...this.EventsList];
}

getFilteredEligibleCourses(event: any): string[] {
  return (event.eligibleCourses || []).filter((c: any) => !!c);
}

getFilteredSelectionProcess(event: any): string[] {
  return(event.selectionProcess || []).filter((s:any) => !!s);
}

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const clickedInsideFilter = !!target.closest('.filter-dropdown');
  const clickedInsideDatepicker = !!target.closest('ngb-datepicker') || !!target.closest('.ngb-dp-container');
  if (!clickedInsideFilter && !clickedInsideDatepicker && this.isFilterVisible) {
    this.closeFilterPopup();
  }
}

  ngOnInit(): void {
  this.filteredEvents = [...this.EventsList];
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
        this.filteredEvents = [... this.EventsList];
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
    this.issidebarvisible = true;
  this.isUpdateMode = false;
  this.eventToUpdate = null;
  this.addEventForm.reset();
  this.submitted = false;
  this.selectedEvent = null;
  this.selectedCompanies = [];
  this.selectedCourses = [];
  this.showCompanyDropdown = false;
  this.showCourseDropdown = false;
  this.dropdownOpen = false;
  }

  cancel(): void {
  this.issidebarvisible = false;
  this.addEventForm.reset();
  this.submitted = false;
  this.selectedEvent = null;
  this.selectedCompanies = [];
  this.selectedCourses = [];
  this.showCompanyDropdown = false;
  this.showCourseDropdown = false;
  this.dropdownOpen = false;
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
    if(this.isUpdateMode && this.eventToUpdate){
      param.id=this.eventToUpdate.id;
      this.eventsSandbox.updatePlacementEvent(param);
      this.subscriptions.push(this.eventsSandbox.updatePlacementEvent$.subscribe(data =>{
        if(data?.status==='true'){
          this.toastr.success('Event updated successfully');
            this.addEventForm.reset();
            this.submitted = false;
            this.issidebarvisible = false;
            this.isUpdateMode = false;
            this.eventToUpdate = null;
            this.eventsSandbox.placementEventsList();
        }
      }))
    } else{
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

  get displayedEvents() {
  // Start with filtered events
  let events = [...this.filteredEvents];

  // Apply search
  if (this.eventSearch && this.eventSearch.trim()) {
    const search = this.eventSearch.trim().toLowerCase();
    events = events.filter(event =>
      (event.eventTitle && event.eventTitle.toLowerCase().includes(search)) ||
      (event.aboutEvent && event.aboutEvent.toLowerCase().includes(search)) ||
      (event.modeOfEvent && event.modeOfEvent.toLowerCase().includes(search)) ||
      (event.venue && event.venue.toLowerCase().includes(search)) ||
      (event.eligibleCourses && event.eligibleCourses.join(', ').toLowerCase().includes(search)) ||
      (event.companyDetails && event.companyDetails.some((c: any) =>
        c.companyName && c.companyName.toLowerCase().includes(search)
      ))
    );
  }

  // Apply sort
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
      events = events.reverse();
      break;
  }

  return events;
}
toggleSettings(event: any) {
  // Close all other settings dropdowns
  this.filteredEvents.forEach(e => {
    if (e !== event) e.showSettings = false;
  });

  // Toggle this one
  event.showSettings = !event.showSettings;
}

parseDateForForm(dateStr: string) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
  }

onUpdateEvent(event: any) {
  this.isUpdateMode = true;
    this.eventToUpdate = event;
    this.issidebarvisible = true;
    this.addEventForm.patchValue({
      eventTitle: event.eventTitle,
      aboutEvent: event.aboutEvent,
      companyDetails: event.companyDetails,
      eventDate: this.parseDateForForm(event.eventDate),
      eventTime: event.eventTime,
      venue: event.venue,
      modeOfEvent: event.modeOfEvent,
      eligibleCourses: event.eligibleCourses,
      eligibleCriteria: event.eligibleCriteria,
      selectionProcess: event.selectionProcess
    });
    this.selectedCompanies = [...(event.companyDetails || [])];
    this.selectedCourses = [...(event.eligibleCourses || [])];
  
}

onCopyEvent(event: any) {
  this.isUpdateMode = false;
  this.eventToUpdate = null;
  this.issidebarvisible = true; // <-- This opens the sidebar
  this.addEventForm.reset();

  this.addEventForm.patchValue({
    eventTitle: event.eventTitle,
    aboutEvent: event.aboutEvent,
    companyDetails: event.companyDetails,
    eventDate: this.parseDateForForm(event.eventDate),
    eventTime: event.eventTime,
    venue: event.venue,
    modeOfEvent: event.modeOfEvent,
    eligibleCourses: event.eligibleCourses,
    eligibleCriteria: event.eligibleCriteria,
    selectionProcess: event.selectionProcess
  });
  this.selectedCompanies = [...(event.companyDetails || [])];
  this.selectedCourses = [...(event.eligibleCourses || [])];

}

onDeleteEvent(event: any) {
  event.showSettings = false;
  // Confirm before deleting
  if (confirm(`Are you sure you want to delete "${event.eventTitle}"?`)) {
    this.eventsSandbox.deletePlacementEvent({ id: event.id});
    this.subscriptions.push(
      this.eventsSandbox.deletePlacementEvent$.subscribe(data => {
        if(data?.status === 'true'){
          this.toastr.success('Event deleted successfully');
          this.eventsSandbox.placementEventsList();
        }
      })
    )
  }
}

filterCourseDropdownOpen = false;

toggleFilterCourseDropdown() {
  this.filterCourseDropdownOpen = !this.filterCourseDropdownOpen;
}

closeFilterCourseDropdown() {
  this.filterCourseDropdownOpen = false;
}

}