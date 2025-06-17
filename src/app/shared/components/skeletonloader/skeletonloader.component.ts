import { Component } from '@angular/core';
import { CompaniesSanbox } from '../../../pages/companies/companies.sandbox';

@Component({
  selector: 'app-skeletonloader',
  standalone: false,
  templateUrl: './skeletonloader.component.html',
  styleUrl: './skeletonloader.component.scss'
})
export class SkeletonloaderComponent {

  constructor(
    public CompaniesSanbox: CompaniesSanbox,
  ){

  }
}
