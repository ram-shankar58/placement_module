import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { CompaniesSanbox } from '../../companies.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-active-companies',
  standalone: false,
  templateUrl: './active-companies.component.html',
  styleUrl: './active-companies.component.scss'
})
export class ActiveCompaniesComponent implements OnInit {

  issidebarvisible = false;
  submitted = false;
  addCompanyForm: any = FormGroup;
  CompaniesList: any = [];
  private subscriptions: Array<Subscription> = [];
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    public CompaniesSanbox: CompaniesSanbox,
  ) { }

  initaddcompanyform() {
    this.addCompanyForm = this.fb.group({
      companyName: new FormControl('', [Validators.required]),
      companyDescription: new FormControl(''),
      location: new FormControl(''),
      industryType: new FormControl('', [Validators.required]),
      numberOfEmployees: new FormControl(''),
      contactPersonName: new FormControl('', [Validators.required]),
      contactEmail: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      companyWebsite: new FormControl(''),
      participatedPlacementEvents: new FormControl([], [Validators.required]),
      mouSigned: new FormControl(false),
      studentsPlacedSoFar: new FormControl(''),
      averageCtc: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
    });
  }

  industryOptions = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'Healthcare' },
    { id: 4, name: 'Core' }
  ];

  employeeOptions = [
    { id: 1, name: '1-50' },
    { id: 2, name: '51-500' },
    { id: 3, name: '501-5000' },
    { id: 4, name: '5000+' }
  ];

  placementEventOptions = [
    { id: 1, name: 'Placement Drive 2024' },
    { id: 2, name: 'Internship Fair' }
  ];


  ngOnInit() {
    this.initaddcompanyform();
    this.companiesList();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideNav = target.closest('.sidebar');
    const clickedInsideBtn = target.closest('.add-cmp');
    if (!clickedInsideNav && !clickedInsideBtn) {
      this.issidebarvisible = false;
    }
  }

  toggleSidebar() {
    this.issidebarvisible = !this.issidebarvisible;
  }

  companiesList() {
    this.CompaniesSanbox.companiesList();
    this.subscriptions.push(this.CompaniesSanbox.companiesList$.subscribe((data) => {
      if (data && data.status == true) {
        console.log('data', data.data)
        this.CompaniesList = data.data;
      }
    }))
  }

  addCompany() {
    this.submitted = true
    let param: any = {}

    param = this.addCompanyForm.value;
    this.CompaniesSanbox.addCompanies(param);
    this.subscriptions.push(this.CompaniesSanbox.addCompanies$.subscribe(data => {
      console.log('data', data.status)

      if (data && data.status == true) {
        console.log('true')
        this.toastr.success('Company Added Successfully')
        return;
      }
    }))
    this.addCompanyForm.reset();
  }
  eventsearch(event: any) {

  }

  filter() {

  }

  sort() {

  }

}
