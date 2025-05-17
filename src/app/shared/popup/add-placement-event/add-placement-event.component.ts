import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-add-placement-event',
  templateUrl: './add-placement-event.component.html',
  styleUrl: './add-placement-event.component.scss',
  standalone: false
})
export class AddPlacementEventComponent {

  
  constructor(public activeModal:NgbActiveModal){}
  isFormValid = false;

  close(){
    this.activeModal.dismiss();
  }

  submit(){

  }

}

