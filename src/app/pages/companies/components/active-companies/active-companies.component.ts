import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { CompaniesSanbox } from '../../companies.sandbox';

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
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    public CompaniesSanbox: CompaniesSanbox
  ) { }

  initaddcompanyform() {
    this.addCompanyForm = this.fb.group({
      company_name: new FormControl('', [Validators.required]),
      company_description: new FormControl(''),
      location: new FormControl(''),
      industry_type: new FormControl('', [Validators.required]),
      employee_count: new FormControl(''),
      contact_name: new FormControl('', [Validators.required]),
      contact_email: new FormControl(''),
      contact_number: new FormControl('', [Validators.required,Validators.minLength(10),Validators.pattern('^[0-9]*$')]),
      company_website: new FormControl(''),
      placement_events: new FormControl([], [Validators.required]),
      mou_signed: new FormControl(false),
      students_placed: new FormControl(''),
      average_ctc: new FormControl(''),
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

  addCompany() {
    this.submitted = true
    let param: any = {}

    if (!this.addCompanyForm.value.company_name) {
      this.toastr.error('Company name is required')
      return;
    }
    if (!this.addCompanyForm.value.industry_type) {
      this.toastr.error('Industry type is required')
      return;
    }
    if (!this.addCompanyForm.value.contact_name) {
      this.toastr.error('Contact name is required')
      return;
    }

    param = this.addCompanyForm.value;
    this.CompaniesSanbox.addCompanies(param)

    console.log('param',param);
    
  }
  eventsearch(event:any){

  }

  filter(){

  }

  sort(){

  }

}
