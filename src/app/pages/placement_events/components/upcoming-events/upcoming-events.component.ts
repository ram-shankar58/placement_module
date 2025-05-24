import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AddPlacementEventComponent} from '../../../../shared/popup/add-placement-event/add-placement-event.component'

@Component({
  selector: 'app-upcoming-events',
  standalone: false,
  templateUrl: './upcoming-events.component.html',
  styleUrl: './upcoming-events.component.scss'
})
export class UpcomingEventsComponent implements OnInit{

  issidebarvisible = false;
  constructor(){

  }

  ngOnInit() {
    
  }

  toggleSidebar(){
    this.issidebarvisible = !this.issidebarvisible;
  }

  addevent(){
    console.log('active company')
    this.issidebarvisible = !this.issidebarvisible;
  }

  eventsearch(event:any){

  }

  filter(){

  }

  sort(){

  }
}
