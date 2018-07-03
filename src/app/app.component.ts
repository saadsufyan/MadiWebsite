import { Component } from '@angular/core';
import { UserActionsService } from '../services/userActions';
import { NetworkService } from '../services/network';
import { SharedService } from '../services/sharedservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [UserActionsService, NetworkService, SharedService]
})
export class AppComponent {
  constructor(private router: Router, private logoutservice : UserActionsService, private sharedService : SharedService) { }
  title = 'app';


    UserLogout(){
    //this.popup.showLoader()
    this.logoutservice.onUserLogout().subscribe((res) => {
              
      
      console.log(res)
      //this.popup.hideLoader()
      if(res.status){
        localStorage.setItem('isLoggedIn', null)
        //localStorage.setItem('user' , null)

        this.router.navigate(['/Login']);
      }
    },
    err => {
      console.log("logged out")
      //this.popup.hideLoader()
      //this.popup.showToast(err.data.error.message[0] , 1500 , 'bottom' , false , "")
    })  

  }
}
