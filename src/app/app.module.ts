import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routes } from './app.router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SignupComponent } from './signup/signup.component';
import { NetworkService } from '../services/network';
import { SharedService } from '../services/sharedservice'
import { HomeComponent } from './home/home.component';
import { HeadersComponent } from './headers/headers.component';
import { VendorsComponent } from './vendors/vendors.component';
import { VendorprofileComponent } from './vendorprofile/vendorprofile.component';

import { StarRatingModule } from 'angular-star-rating';
import { DealsComponent } from './deals/deals.component';
import { AddonComponent } from './addon/addon.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { BooknowComponent } from './booknow/booknow.component';
import { MaterialModule } from './material.module';

import { AgmCoreModule } from 'angular2-google-maps/core';

const googleMapsCore = AgmCoreModule.forRoot({
  apiKey : 'AIzaSyDiJ0oGy0xy6mcrh0c318mtujMTn_ENrSc',
});

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeadersComponent,
    VendorsComponent,
    VendorprofileComponent,
    DealsComponent,
    AddonComponent,
    CartComponent,
    CheckoutComponent,
    PaymentComponent,
    ProfileComponent,
    BooknowComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    routes,
    HttpModule,
    StarRatingModule,
    AlertModule,
    MaterialModule,
    googleMapsCore
    
  ],
  providers: [NetworkService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
