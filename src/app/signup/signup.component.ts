import { Component, OnInit } from '@angular/core';
import { UserActionsService } from '../../services/userActions';
import { NetworkService } from '../../services/network';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers : [UserActionsService, NetworkService]
})
export class SignupComponent {

  public errorMessage : any
  constructor(private router: Router, public signupservice : UserActionsService) { }


 UserSignUp(username,email,password,confirmpassword){
    
    if(username != undefined || email != undefined || password != undefined || confirmpassword != undefined){
      if(password != confirmpassword){

      }else{
        let data = {
            "email": email,
            "name": username,
            "password": password,
        }
 
        console.log("inside if statement")
        this.signupservice.onUserSignup(data).subscribe(res => {

            console.log(res)
            if(res.status){
              localStorage.setItem('user' , JSON.stringify(res.response))
              localStorage.setItem('isLoggedIn', "true")
              this.router.navigate(['/Login']);
              //this.navCtrl.setRoot(MyTabs , {} , {animation:'left'})
            }
          } , err => {

            console.log("error occured")
              this.errorMessage = JSON.parse(err._body)
              this.errorMessage = this.errorMessage.error.message[0]

          });
      }
    }else{
      //console.log('code is ',code)

    }
 }  
}
