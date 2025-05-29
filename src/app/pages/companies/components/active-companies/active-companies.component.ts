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
  CompaniesList:any = [];
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
    this.CompaniesList = [
      {
        name: "Johnson & Johnson",
        logoUrl: "assets/images/johnson-logo.png",
        location: "Great Falls, Maryland",
        industry: "Children products",
        size: "200 - 500 employees",
        description: "A global leader in health and wellness products, committed to improving lives worldwide.",
        placementEvents: 12,
        studentsPlaced: 23,
        avgCtc: 4.5
      },
      {
        name: "Google",
        logoUrl: "assets/images/google-logo.png",
        location: "Mountain View, California",
        industry: "Technology",
        size: "10000+ employees",
        description: "Shaping the future with AI-driven solutions and innovation at scale.",
        placementEvents: 20,
        studentsPlaced: 80,
        avgCtc: 15
      },
      {
        name: "Tata Consultancy Services",
        logoUrl: "assets/images/tcs-logo.png",
        location: "Mumbai, India",
        industry: "IT Services",
        size: "50000+ employees",
        description: "A global IT consulting company delivering business solutions and digital transformation.",
        placementEvents: 35,
        studentsPlaced: 120,
        avgCtc: 3.8
      },
      {
        name: "Amazon",
        logoUrl: "assets/images/amazon-logo.png",
        location: "Seattle, Washington",
        industry: "E-Commerce & Cloud",
        size: "750000+ employees",
        description: "Customer-obsessed tech company revolutionizing e-commerce and cloud computing.",
        placementEvents: 15,
        studentsPlaced: 65,
        avgCtc: 13.2
      },
      {
        name: "Zoho Corporation",
        logoUrl: "assets/images/zoho-logo.png",
        location: "Chennai, India",
        industry: "SaaS",
        size: "9000+ employees",
        description: "An Indian software company offering a suite of online productivity tools and SaaS applications.",
        placementEvents: 10,
        studentsPlaced: 40,
        avgCtc: 6.5
      },
      {
        name: "Infosys",
        logoUrl: "assets/images/infosys-logo.png",
        location: "Bangalore, India",
        industry: "Consulting & IT",
        size: "25000+ employees",
        description: "Helping enterprises transform through digital technology and consulting services.",
        placementEvents: 25,
        studentsPlaced: 98,
        avgCtc: 4.2
      }
    ];

  }

  addCompany() {
    this.submitted = true
    let param: any = {}

    param = this.addCompanyForm.value;
    this.CompaniesSanbox.addCompanies(param);
    this.subscriptions.push(this.CompaniesSanbox.addCompanies$.subscribe(data => {
      console.log('data', data.status)

      if (data.status == "true") {
        console.log('true')
        this.toastr.success('Company Added Successfully')
        return;
      }
    }))
    this.addCompanyForm.reset();
  }

}
