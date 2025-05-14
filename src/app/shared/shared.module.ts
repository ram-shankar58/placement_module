import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonheaderComponent } from './components/commonheader/commonheader.component';
import { FooterbarComponent } from './components/footerbar/footerbar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    CommonheaderComponent,
    FooterbarComponent,
    BreadcrumbsComponent,
    RouterModule
  ],
  declarations: [
     SidebarComponent,
     CommonheaderComponent,
     FooterbarComponent,
     BreadcrumbsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule { }


