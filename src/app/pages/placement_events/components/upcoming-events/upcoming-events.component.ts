import { Component, OnInit, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Toast, ToastrService } from 'ngx-toastr';
import { PlacementEventsSandbox } from '../../placement_events.sandbox';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upcoming-events',
  standalone: false,
  templateUrl: './upcoming-events.component.html',
  styleUrl: './upcoming-events.component.scss'
})
export class UpcomingEventsComponent implements OnInit{

  issidebarvisible = false;
  submitted = false;
  addPlacementEventForm: any = FormGroup;
  PlacementEventsList: any =[];
  private subscriptions: Array<Subscription> = [];
  
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    public placementEventsSandbox: PlacementEventsSandbox
  ){}

  initaddplacementeventform(){
    this.addPlacementEventForm=this.fb.group({
      eventTitle: new FormControl('', [Validators.required]),
      eventDescription: new FormControl(''),
      eventMode: new FormControl('', [Validators.required]),
      eventDate: new FormControl('', [Validators.required]),
      eventStartTime: new FormControl('', [Validators.required]),
      eventVenue: new FormControl('', [Validators.required]),
      companyDetail:new FormControl('', [Validators.required]),
      eligibleCourses: new FormControl('', [Validators.required]),
      eligibleCriteria: new FormControl('', [Validators.required]),
      selectionProcess: new FormControl('', [Validators.required]),

    });
  }

  eventModeOptions = [
    {id: 1, title: 'On-Campus', description:'At your college'},
    {id: 2, title: 'Off-Campus', description: 'External Drive'},
    {id: 3, title: 'Pool', description: 'Multi-College drive'},
    {id: 4, title: 'Virtual', description: 'Online Process'}
  ];

  eligibleCoursesOptions=[
    {id:1, name:'BTech Cse'},
    {id:2, name: 'Btech IT'},
    {id:3, name: 'BTech ECE'},
    {id:4, name: 'BTech EEE'},
  ]; //Can be further extended as required


  ngOnInit() {
    this.initaddplacementeventform();
    this.placementEventsList();
    
  }

  toggleSidebar(){
    this.issidebarvisible = !this.issidebarvisible;
  }

  addevent(){
    console.log('active company')
    this.issidebarvisible = !this.issidebarvisible;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent){
    const target=event.target as HTMLElement;
    const clickedInsideNav=target.closest('.sidebar');
    const clickedInsideBtn=target.closest('.add-cmp');
    if(!clickedInsideNav && !clickedInsideBtn){
      this.issidebarvisible=false;
    }
  }

  //Below list to be updated with more tags and objects
  placementEventsList(){
    this.PlacementEventsList=[
      {
        code: 'EVT001',
        title: 'Campus Recruitment Drive - Java Architects',
        logoUrl:'assets/images/',
      }
    ];

  }

  addEvent(){
    this.submitted=true;
    let param: any={}

    param=this.addPlacementEventForm.value;
    this.placementEventsSandbox.addPlacementEvents(param);
    this.subscriptions.push(this.placementEventsSandbox.addPlacementEvents$.subscribe(data => {
      console.log('data', data.status)

      if(data.status=="true"){
        console.log('true')
        this.toastr.success('Company Added Successfully')
        return;
      }
    }))
    this.addPlacementEventForm.reset();

  }

  eventsearch(event:any){

  }

  filter(){

  }

  sort(){

  }
}
