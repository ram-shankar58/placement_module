// import { Component, OnInit } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
// import { AddPlacementEventComponent} from '../../../../shared/popup/add-placement-event/add-placement-event.component'

// @Component({
//   selector: 'app-upcoming-events',
//   standalone: false,
//   templateUrl: './upcoming-events.component.html',
//   styleUrl: './upcoming-events.component.scss'
// })
// export class UpcomingEventsComponent implements OnInit{

//   issidebarvisible = false;
//   constructor(){

//   }

//   ngOnInit() {
    
//   }

//   toggleSidebar(){
//     this.issidebarvisible = !this.issidebarvisible;
//   }

//   addevent(){
//     console.log('active company')
//     this.issidebarvisible = !this.issidebarvisible;
//   }

//   eventsearch(event:any){

//   }

//   filter(){

//   }

//   sort(){

//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  issidebarvisible = false;
  addPlacementEventForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.addPlacementEventForm = this.fb.group({
      eventTitle: [''],
      description: [''],
      mode: [''],
      eventDate: [''],
      startTime: [''],
      location: [''],
      companies: [''],
      eligibleCourses: [''],
      criteria: [''],
      aptitude: [false],
      technical: [false],
      hr: [false]
    });
  }

  toggleSidebar() {
    this.issidebarvisible = !this.issidebarvisible;
  }

  addevent() {
    this.issidebarvisible = true;
  }

  addEvent() {
    this.submitted = true;
    if (this.addPlacementEventForm.valid) {
      console.log(this.addPlacementEventForm.value);
      this.toggleSidebar();
    } else {
      console.log('Form invalid');
    }
  }

  eventsearch(event: any) {}

  filter() {}

  sort() {}
}

