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

  isPanelOpen = false;
  constructor(private modalservice: NgbModal){

  }

  ngOnInit() {
    
  }

  addevent(){
    this.modalservice.open(AddPlacementEventComponent,{
      backdrop: true,
      keyboard: true,
      scrollable: true,
      centered: false,
      backdropClass: 'custom-backdrop',
      windowClass: 'slide-right-modal'
    });
  }

  eventsearch(event:any){

  }

  filter(){

  }

  sort(){

  }
}
