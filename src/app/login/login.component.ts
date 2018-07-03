import { Component, OnInit } from '@angular/core';
import { UserActionsService } from '../../services/userActions';
import { NetworkService } from '../../services/network';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [UserActionsService, NetworkService]
})
export class LoginComponent{

  public errorMessage : any = "";
  constructor(private router: Router, public loginservice : UserActionsService) { 
    // localStorage.setItem('user', 'true')
    // console.log(localStorage.getItem('user'))
  }

  
  goToRegister(){
    this.router.navigate(['/Signup']);
  }

  UserLogin(username,password){
    if(username != undefined && password != undefined){
  
      let data = {
        "email": username,
        "password": password
      }
      this.loginservice.onUserLogin(data).subscribe(res => {

      if(res.status){
        console.log(res)
        localStorage.setItem('user' , JSON.stringify(res.response))
        localStorage.setItem('isLoggedIn', "true")
        this.router.navigate(['/Home']);
        }
      }, err => {
                console.log(err);

                this.errorMessage = JSON.parse(err._body)
                console.log(this.errorMessage)
                this.errorMessage = this.errorMessage.error.message[0]

      })
    }else {
      console.log('some problem occured')
    }
  }

}
