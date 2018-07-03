import { Component, OnInit } from '@angular/core';
import { UserActionsService } from '../../services/userActions';
import { NetworkService } from '../../services/network';
import {CategoryService } from '../../services/category';
import { SharedService } from '../../services/sharedservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
  providers : [UserActionsService, NetworkService, CategoryService, SharedService]
})
export class HeadersComponent implements OnInit {

  public categories : any 
  constructor(private router: Router, private logoutservice : UserActionsService, private category : CategoryService, private sharedService : SharedService ) { 
    // this.getUserCategory("","en")
  }

  ngOnInit() {
  }

  goToHome(){
    this.router.navigate(['/Home']); 
  }

  goToVendors(id){
    this.router.navigate(['/Vendors',id]);
    console.log(id) 
    this.sharedService.send(id)
  }


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


  // getUserCategory(category_name,lang){
  //   this.category.onUserCategory(category_name,lang).subscribe(res =>{

  //     console.log(res)
  //     res.status && res.response.length > 0 ? this.categories = res.response : console.log("error getting data")


  //   },err =>{
  //     console.log("not responding")
  //   })
  // }
}
