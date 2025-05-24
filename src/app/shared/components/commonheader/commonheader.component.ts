import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commonheader',
  standalone: false,
  templateUrl: './commonheader.component.html',
  styleUrl: './commonheader.component.scss'
})
export class CommonheaderComponent {
  constructor(private router: Router){

  }
  isMenuOpen = false;
  screenWidth = window.innerWidth;
  activeIndex: number | null = null;

  navItems = [
      { label: 'Home', icon: 'assets/icons/home.svg', route: '/dashboard' },
      { label: 'Placement Events', icon: 'assets/icons/events.svg', route: '/placementEvents' },
      { label: 'Students', icon: 'assets/icons/university-students.svg', route: '/students' },
      { label: 'Company', icon: 'assets/icons/companies.svg', route: '/companies' },
      { label: 'Reports', icon: 'assets/icons/reports.svg', route: '/reports' }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isProfiletoggle(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleNavItem(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
    const selectedRoute = this.navItems[index].route;
    this.router.navigate([selectedRoute]);
  }

  // Close menu if clicked outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInsideNav = 
    target.closest('.nav-items') || 
    target.closest('.nav-toggle') || 
    target.closest('.profile-wrapper');
    if (!clickedInsideNav || this.screenWidth <= 600) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 600) {
      this.isMenuOpen = false;
    }
  }
}
