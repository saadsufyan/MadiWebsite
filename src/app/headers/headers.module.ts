import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { HomeComponent } from '../home/home.component';
import { VendorsComponent } from '../vendors/vendors.component';
import { VendorprofileComponent } from '../vendorprofile/vendorprofile.component';
import { SharedService } from '../../services/sharedservice';

import { HeadersRoutingModule } from './headersRouting.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeadersRoutingModule
  ],
  declarations: [

    HomeComponent,
    VendorsComponent,
    VendorprofileComponent
  ],
  providers: [
    SharedService
  ]
})
export class HeadersModule {}