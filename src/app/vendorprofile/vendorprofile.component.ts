import { Component, OnInit, Input } from '@angular/core';
import { Router,  ActivatedRoute, ParamMap  } from '@angular/router';
import { NetworkService } from '../../services/network';
import {CategoryService } from '../../services/category';
import { SharedService } from '../../services/sharedservice';
import { CartService } from '../../services/cart'

@Component({
  selector: 'app-vendorprofile',
  templateUrl: './vendorprofile.component.html',
  styleUrls: ['./vendorprofile.component.css'],
  providers : [NetworkService, CategoryService, SharedService, CartService]
})


export class VendorprofileComponent implements OnInit {

  public vendorProductId : any 
  public productlist : any = {}
  public cId : any
  public show;

  public dealname = []

  public productDeals = []
  public products = []
  public services = []
  public errorMessage : any = ""

  public temp : any
  public slotArray : any = []
  constructor(private router: Router, private route: ActivatedRoute, public category : CategoryService,public cart : CartService , private sharedService : SharedService) {

    this.cId = this.category.fetchCategoryId()
    console.log(this.cId)
   }

  ngOnInit() {
    this.vendorProductId = this.route.snapshot.params['id'];
    console.log("vendor ID: " + this.vendorProductId)

    this.getVendorProducts()
  
  }
  ngAfterViewInit(){
    console.log("im here")
  }  

  goToDeals(deal_id){
    this.router.navigate(['/Deals',deal_id]);
    console.log(deal_id)
    console.log(this.vendorProductId)
    this.sharedService.send(this.vendorProductId)
    this.cart.sendVendorId(this.vendorProductId)
    
  }
  goToAddOn(productid,name){

    console.log(productid)
    this.router.navigate(['/Addon',productid]);

    console.log(name)
    this.sharedService.send(name)

  }  

  goToBookNow(){
    this.router.navigate(['/Booknow'])
    console.log(this.vendorProductId)
    this.sharedService.send(this.vendorProductId)
    this.cart.sendVendorId(this.vendorProductId)
  }

  getVendorProducts(){

    this.category.onCategoryVendorProduct(this.cId, this.vendorProductId).subscribe(res => {
      console.log(res)
      res.status  ? this.productlist = res.response : console.log("no values to show")
      let temp = []

      res.response.products_deals.filter(value => {
        this.products.push(value.products)
      })
      console.log(this.products)
      // this.productDeals = temp
      // this.productlist.filter(value =>{

      //   this.productDeals = res.response.productDeals[value].products
      // })


      // this.products = res.response.productDeals[0].products


      let data = res.response.products_deals
      data.filter(value => {
        
        console.log(value.deal_name)
        let deal = value.deal_name
        let id = value.deal_id
        let temp = {
          "name" : deal,
          "deal_id": id
        }
        this.dealname.push(temp)

      })

      console.log(this.dealname)


      this.services = this.productlist.Services
      console.log(this.services)

      var opentime  = new Date(this.productlist.open_time * 1000)
      var d = new Date(); // for now
      d.getHours(); // => 9
      d.getMinutes(); // =>  30
      d.getSeconds(); // => 51

      console.log(d.getSeconds() + " " + d.getMinutes() + " " + d.getHours())
      console.log(opentime)

      var closeTime = new Date(this.productlist.close_time * 1000)
      console.log(closeTime)





      var getTimeIntervals = function (opentime, closeTime) {
        var arr = []

        console.log('open time ' + opentime.getHours())
        console.log('closed time ' + closeTime.getHours())
        while(opentime < closeTime){
          console.log("im here inside getTimeIntervals")
          arr.push(opentime.toTimeString().substring(0,5));
          opentime.setMinutes(opentime.getMinutes() + res.response.slot_time);
        }
        return arr;
      }

      var intervals = getTimeIntervals(opentime, closeTime);

      console.log(intervals)

      if(d.getHours()  > opentime.getHours()){
        console.log("restaurent open")
        this.show = true
      }else{
        this.show = false
        console.log("restaurent close")
      }
    },err =>{
      console.log("not responding")
      console.log(err);
      console.log(this.errorMessage)

    })   
  }
}
