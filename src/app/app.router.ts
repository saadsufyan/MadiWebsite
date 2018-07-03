import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { HeadersComponent } from './headers/headers.component';
// import { NewHomeComponent } from './headers/new-home.component';
import { VendorsComponent } from './vendors/vendors.component';
import { VendorprofileComponent } from './vendorprofile/vendorprofile.component';
import { DealsComponent } from './deals/deals.component';
import { AddonComponent } from './addon/addon.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { BooknowComponent } from './booknow/booknow.component';

export const router : Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'Headers', component: HeadersComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Vendors/:id', component: VendorsComponent },
  { path: 'VendorsProfile/:id', component: VendorprofileComponent },
  { path: 'Deals/:id', component: DealsComponent }, 
  { path: 'Addon/:id', component: AddonComponent },
  { path: 'Cart', component: CartComponent },  
  { path: 'Checkout', component: CheckoutComponent }, 
  { path: 'Payment', component: PaymentComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Booknow' , component: BooknowComponent }
];


// @NgModule({
//   imports: [ RouterModule.forRoot(routes) ],
//   exports: [ RouterModule ]
// })

// export const router: Routes = [
//   {
//     path: '',
    
//     component: HeadersComponent,
//     children: [
//       {
//         path: 'Home',
//         component: HomeComponent,
//       }
//     ]
//   },
//   { path: 'Login', component: LoginComponent },
//   { path: 'Signup', component: SignupComponent },
//   { path: '',   redirectTo: '/Login', pathMatch: 'full' },
  
// ];


export const routes: ModuleWithProviders = RouterModule.forRoot(router);