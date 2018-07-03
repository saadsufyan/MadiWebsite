import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { VendorsComponent } from '../vendors/vendors.component';
import { VendorprofileComponent } from '../vendorprofile/vendorprofile.component';
import { SharedService } from '../../services/sharedservice';

const HeaderRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ':id',
        component: VendorsComponent,
        children: [
          {
            path: ':id',
            component: VendorprofileComponent,

          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(HeaderRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    
  ]
})
export class HeadersRoutingModule { }
