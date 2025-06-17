import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonheaderComponent } from './components/commonheader/commonheader.component';
import { FooterbarComponent } from './components/footerbar/footerbar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { AddPlacementEventComponent } from './popup/add-placement-event/add-placement-event.component';
import { SkeletonloaderComponent } from './components/skeletonloader/skeletonloader.component';



@NgModule({
  imports: [
    CommonModule
    ],
  exports: [
    SidebarComponent,
    CommonheaderComponent,
    FooterbarComponent,
    BreadcrumbsComponent,
    SkeletonloaderComponent,
    RouterModule
  ],
  declarations: [
     SidebarComponent,
     CommonheaderComponent,
     FooterbarComponent,
     BreadcrumbsComponent,
     AddPlacementEventComponent,
     SkeletonloaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule { }


