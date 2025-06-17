import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { CompaniesSanbox } from '../../companies.sandbox';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { AwsuploadService } from '../../../../providers/services/awsupload.service';

@Component({
  selector: 'app-active-companies',
  standalone: false,
  templateUrl: './active-companies.component.html',
  styleUrl: './active-companies.component.scss'
})
export class ActiveCompaniesComponent implements OnInit {

  issidebarvisible = false;
  isMenuOpen = false;
  isfilterbarvisible = false;
  skeletonCount = Array(6);
  openMenuId: string | null = null;
  addCompanyForm: any = FormGroup;
  filterCompanyForm:any = FormGroup;
  CompaniesList: any = [];
  filteredCompanyList:any = [];
  filteredCompanies:any = [];
  submit: string = '';
  imgurl: any;
  private subscriptions: Array<Subscription> = [];
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    public CompaniesSanbox: CompaniesSanbox,
    private awsupload: AwsuploadService
  ) { }

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
    this.initfilterCompanyForm();
  }

  initfilterCompanyForm(){
    this.filterCompanyForm = this.fb.group({
      location: new FormControl(''),
      industryType: new FormControl('', [Validators.required]),
      participatedPlacementEvents: new FormControl([])
    });
  }

  initaddcompanyform() {
    this.addCompanyForm = this.fb.group({
      id: new FormControl(''),
      companyName: new FormControl('', [Validators.required, Validators.pattern(/\S+/)]),
      logo: new FormControl(''),
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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideNav = target.closest('.sidebar');
    const clickedInsideBtn = target.closest('.add-cmp') || target.closest('.btn-primary');
    const clickedInsideCardMenu = target.closest('.menu-icon');
    const clickedInsidefilterbartab = target.closest('.filterbar') || target.closest('.filter');
    const clickedInsideUpdateandCopy = target.closest('.update') || target.closest('.copycmp');
    if (!clickedInsideNav && !clickedInsideBtn && !clickedInsideUpdateandCopy && !clickedInsideCardMenu) {
      this.issidebarvisible = false;
      this.isMenuOpen = false;
    }
    if (!clickedInsidefilterbartab) {
      this.isfilterbarvisible = false;
    }
  }

  addCompanyOpen() {
    console.log('opennn');
    this.issidebarvisible = !this.issidebarvisible;
    this.addCompanyForm.reset();
    this.submit = 'add';
    console.log('issidebarvisible',this.issidebarvisible);
  }

  toggleSidebar() {
    this.addCompanyForm.reset();
    this.issidebarvisible = !this.issidebarvisible;
  }

  toggleMenu(id: string) {
    this.openMenuId = this.openMenuId === id ? null : id;
    this.isMenuOpen = !this.isMenuOpen;
  }
  companiesList() {
    this.CompaniesSanbox.companiesList();
    this.subscriptions.push(this.CompaniesSanbox.companiesList$.subscribe((data) => {
      if (data && data.status == true) {
        this.CompaniesList = data.data;
        this.filteredCompanies = this.CompaniesList;
      }
    }))
  }

  onFileUpload(event: any) {
    const file: File = event.target.files[0];
    if (!file || !file.type.match(/image\/*/)) {
      console.error('Invalid file or unsupported type');
      return;
    }

    const bucket = 'gradit-communication';
    const bucketPath = moment().format('YYYY-MM-DD');
    const fileType = file.type;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);
    formData.append('bucketPath', bucketPath);
    formData.append('fileType', fileType);

    this.awsupload.ImgUpload(formData).subscribe({
      next: (res: any) => {
        console.log('Upload success:', res);
        const uploadedUrl = res?.data?.[0]?.data?.[0];
        if (uploadedUrl) {
          this.imgurl = uploadedUrl;
          this.addCompanyForm.get('logo')?.setValue(this.imgurl);
        }
      },
      error: (err) => {
        console.error('Upload failed:', err);
      }
    });
  }


  addCompany() {
    let param: any = {}
    param = this.addCompanyForm.value;
    param.mouSigned = !!param.mouSigned;
    console.log("param,", param);

    this.CompaniesSanbox.addCompanies(param);
    this.subscriptions.push(this.CompaniesSanbox.addCompanies$.subscribe(data => {

      if (data && data.status == true) {
        this.toastr.success('Company Added Successfully')
        return;
      }

      if (data && data.status == false) {
        console.log('false')
        this.toastr.error('Company Already Exists')
        return;
      }
    }))
    this.addCompanyForm.reset();
    this.companiesList();
  }

  eventsearch(event: any) {

  }

  clearfilter(){
    this.filterCompanyForm.reset();
    this.filteredCompanies = this.CompaniesList
  }
  filtertoggle() {
    this.filterCompanyForm.reset();
    this.isfilterbarvisible = !this.isfilterbarvisible;
    this.filteredCompanies = this.CompaniesList
  }

 filterCompany() {
  const param = this.filterCompanyForm.value;

  this.filteredCompanyList = [
    {
      key: 'location',
      value: param.location,
      filterType: 1
    },
    {
      key: 'industryType',
      value: param.industryType,
      filterType: 2
    },
    {
      key: 'participatedPlacementEvents',
      value: param.participatedPlacementEvents,
      filterType: 3
    }
  ].filter(f => f.value && f.value !== '');
  this.filteredCompanies = this.CompaniesList.filter((company: any) => {
  return this.filteredCompanyList.some((filter: any) => {
    if (filter.key === 'participatedPlacementEvents') {
      return Array.isArray(company[filter.key]) &&
             Array.isArray(filter.value) &&
             filter.value.some((val: string) => company[filter.key].includes(val));
    }
    return company[filter.key] === filter.value;
  });
});

}


  sort() {

  }
  getCompaniesbyId(id: any) {
    return this.CompaniesList.find((company: any) => company.id === id);
  }

  updateCompanyOpen(id: any) {
    this.submit = 'update';
    this.issidebarvisible = true;
    const company = this.getCompaniesbyId(id);

    if (company) {
      this.imgurl = company.logo;
      this.addCompanyForm.setValue({
        id: company.id,
        companyName: company.companyName,
        logo:company.logo,
        companyDescription: company.companyDescription,
        location: company.location,
        industryType: company.industryType,
        numberOfEmployees: company.numberOfEmployees,
        contactPersonName: company.contactPersonName,
        contactEmail: company.contactEmail,
        phoneNumber: company.phoneNumber,
        companyWebsite: company.companyWebsite,
        participatedPlacementEvents: company.participatedPlacementEvents,
        mouSigned: company.mouSigned,
        studentsPlacedSoFar: company.studentsPlacedSoFar,
        averageCtc: company.averageCtc
      })
    }
  }

  updateCompany() {
    let param: any = {}
    param = this.addCompanyForm.value;

    this.CompaniesSanbox.updatecompany(param);
    this.subscriptions.push(this.CompaniesSanbox.updateCompany$.subscribe((data) => {
      if (data && data.status == true) {
        this.toastr.success('Company Updated Successfully')
        return;
      }
      if (data && data.status == false) {
        this.toastr.error('Company Not Updated')
        return;
      }
    }))
    this.addCompanyForm.reset();
    this.companiesList();
  }

  onCopy(id: any) {
    this.issidebarvisible = true;
    const company = this.getCompaniesbyId(id);
    this.submit = 'add';
    if (company) {
      this.imgurl = company.logo;
      this.addCompanyForm.setValue({
        id: company.id,
        companyName: company.companyName,
        logo:company.logo,
        companyDescription: company.companyDescription,
        location: company.location,
        industryType: company.industryType,
        numberOfEmployees: company.numberOfEmployees,
        contactPersonName: company.contactPersonName,
        contactEmail: company.contactEmail,
        phoneNumber: company.phoneNumber,
        companyWebsite: company.companyWebsite,
        participatedPlacementEvents: company.participatedPlacementEvents,
        mouSigned: company.mouSigned,
        studentsPlacedSoFar: (company.studentsPlacedSoFar).toString(),
        averageCtc: company.averageCtc
      })
    }
  }

  onArchive() {
    // Handle archive logic
  }

}
