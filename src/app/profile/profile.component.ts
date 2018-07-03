import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute, ParamMap  } from '@angular/router';
import { NetworkService } from '../../services/network';
import { UserActionsService } from '../../services/userActions';
import { SharedService } from '../../services/sharedservice';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers : [NetworkService, UserActionsService, SharedService]

})
export class ProfileComponent implements OnInit {

  public user : any = {}
  public gender : any
  public birth : any
  public country : any
  public city : any
  public address : any
  public avatar : any

  public errorMessage : any

  constructor(private router: Router, private route: ActivatedRoute, public profileservice : UserActionsService, private sharedService : SharedService) { }

  ngOnInit() {
  }

  onChange(event) {
    var image = event.srcElement.files[0];
    var formdata = new FormData();
    formdata.append('avatar', image);
    this.profileservice.onUpdateProfilePicture(formdata).subscribe(res => {
      console.log(res)
      if(res.status){
        this.user.avatar = res.response.avatar
        let user = JSON.parse(localStorage.getItem('user'))
        this.avatar = res.response.avatar




      }
    },
    err => {
      console.log(err)
      console.log("picture not able to upload")
    })
  }  

  uploadProfile(){

  }

  updateProfile(name,email,phone){
    if(name != undefined || email != undefined || phone != undefined){

      let data = {
        "name": name,
        "gender": this.gender,
        "email": email,
        "date_of_birth": this.birth,
        "phone" : phone,
        "country" : this.country,
        "city": this.city,
        "address" : this.address,
        "avatar" : this.avatar
      }

      console.log(data)




      this.profileservice.onUpdateProfile(data).subscribe(res=>{
        console.log(res)
        if(status){
          console.log(res)
        }
      },err=>{
      console.log("not responding")
      console.log(err);
      console.log(this.errorMessage)

      })

    }

  }

}
