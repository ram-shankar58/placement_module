import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{
  pageInfo: any;
  constructor(
    public router:Router,
    public activatedroute: ActivatedRoute
  ){

  }
  ngOnInit() {
    
  }
}
