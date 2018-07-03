import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network';
import {CategoryService } from '../../services/category';
import { SharedService } from '../../services/sharedservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers : [NetworkService, CategoryService, SharedService]
})
export class HomeComponent implements OnInit {

  public categories : any 
  public errorMessage : any = ""
  
  constructor(private router: Router, public category : CategoryService, private sharedService : SharedService) { 
    this.getUserCategory("","en")
  }
  ngOnInit() {
  }

  goToVendors(id){
    this.router.navigate(['/Vendors',id]);
    console.log(id) 
    // this.sharedService.send(id)
  }
  
  getUserCategory(category_name,lang){
    this.category.onUserCategory(category_name,lang).subscribe(res =>{

      console.log(res)
      res.status && res.response.length > 0 ? this.categories = res.response : console.log("error getting data")


    },err =>{
      console.log("not responding")
      console.log(err);
      console.log(this.errorMessage)

    })
  }
}
