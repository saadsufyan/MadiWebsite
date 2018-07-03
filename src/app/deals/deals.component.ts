import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute, ParamMap  } from '@angular/router';
import { NetworkService } from '../../services/network';
import {ProductService } from '../../services/product';
import { SharedService } from '../../services/sharedservice';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css'],
  providers : [NetworkService, ProductService, SharedService]
})
export class DealsComponent implements OnInit {

  public vendorid : any
  public dealid : any

  public items : any
  public errorMessage : any = ""

  constructor(private router: Router, private route: ActivatedRoute, public product : ProductService, private sharedService : SharedService) {

    this.vendorid = this.sharedService.fetchId()
    console.log("Vendor ID: " + this.vendorid)
    

   }

  ngOnInit() {
    this.dealid = this.route.snapshot.params['id'];
    console.log("Deal ID : " + this.dealid)
    this.productDeals()
  }

  goToAddOn(productid,name){

    console.log(productid)
    this.router.navigate(['/Addon',productid]);

    console.log(name)
    this.sharedService.send(name)

  }


  productDeals(){
    this.product.onCategoryVendorProductDeals(this.vendorid,this.dealid).subscribe(res =>{

      console.log(res)
      res.status && res.response.length > 0 ? this.items = res.response : console.log("no data found ")


    },err =>{
      console.log("not responding")
      console.log(err);
      console.log(this.errorMessage)

    })    
  }

}
