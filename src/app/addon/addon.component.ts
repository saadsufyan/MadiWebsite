import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute, ParamMap  } from '@angular/router';
import { NetworkService } from '../../services/network';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart'
import { SharedService } from '../../services/sharedservice';

@Component({
  selector: 'app-addon',
  templateUrl: './addon.component.html',
  styleUrls: ['./addon.component.css'],
  providers : [NetworkService, ProductService, CartService, SharedService]
})
export class AddonComponent implements OnInit {

  public errorMessage : any = "";

  public total : number = 0
  public totalPrice = []
  public items = {
    "parameter": [
      {
        "key": "drinks",
        "value": [
          "pepsi",
          "7up",
          "fanta"
        ]
      },
      {
        "key": "spice",
        "value": [
          "low",
          "mid",
          "high"
        ]
      }
    ],
    "addon": [
      {
        "id": 1,
        "name": "extra cheese",
        "price": 2
      },
      {
        "id": 1,
        "name": "ketchup",
        "price": 1
      },
      {
        "id": 1,
        "name": "mustard",
        "price": 3
      }
    ]
  }

  public productid : any
  public drinks : any
  public name : any
  public comments : any
  public extras : any = []
  public addon : any = []

  public itemcount : number = 0
  public selectedValue = []
  public params : any = []
  public selectedval : any

  constructor(private router: Router, private route: ActivatedRoute, public product : ProductService, public cart : CartService, private sharedService : SharedService) { 

    this.name = this.sharedService.fetchId()
    console.log(this.name)
  }

  ngOnInit() {
    this.productid = this.route.snapshot.params['id'];
    console.log(this.productid)

    this.productAddOn()
  }

  productAddOn(){
    this.product.onAddon(this.productid).subscribe(res =>{

      console.log(res)
      // res.status && res.response.length > 0 ? this.items = res.response : console.log("no data found ")

      let data = this.items.parameter
      data.filter(val=>{
        let v = val.value
        let temp = {
          "value" : v
        }
        this.extras.push(temp)
      })
      // this.extras = res.response.parameter.value
      console.log(this.extras)
      this.addon = this.items.addon





    },err =>{
      console.log("not responding")
      console.log(err);
      //this.errorMessage = JSON.parse(err._body)
      console.log(this.errorMessage)
      //this.errorMessage = this.errorMessage.error.message[0]
    }) 
  }

      
  clickCounterAdd(){
    this.itemcount = this.itemcount + 1;
  }
  clickCounterSub(){

    if(this.itemcount>0){
      this.itemcount = this.itemcount - 1;
    }
  }

  getSelectedParameters(){

      let data = this.items.parameter
      data.filter(value => {
        console.log("key: " + value.key, "Value: " + value.value)
        let key = value.key
        let val = value.value
        let temp = {
          "key" : key,
          "value": this.selectedval
        }
        this.params.push(temp)
      })

      console.log(this.params)
  }


  getSelectedItem(value,id,price){
    console.log(value,id)


    if(value == true){
      console.log("values selected")
      this.selectedValue.push(id)
      console.log("id : " + this.selectedValue)

      this.totalPrice.push(price)
      console.log("price : " + this.totalPrice)

      console.log(price)
      this.total += price; 
      console.log("total Price : " + this.total)
    }
    else if (value == false){
      console.log("values not selected")
     this.selectedValue.pop()
      console.log("id : " + this.selectedValue)

      this.totalPrice.pop()
      console.log("price : " + this.totalPrice)

      if(price>0){
        this.total -= price; 
        console.log("total price : " + this.total)
      }

    }
  }  

  AddToCart(){
    this.getSelectedParameters()

    let data = {
      "product_id" : this.productid,
      "quantity" : this.itemcount,
      "comments" : this.comments,
      "parameter" : this.params,
      "addon_ids" : this.selectedValue
    }

    console.log(data)


    // this.router.navigate(['/Cart']); // remove this when use post api

    this.cart.onAddtoCart(data).subscribe(res =>{
      if(res.status){
        console.log(res)
        this.router.navigate(['/Cart']);
      }

    },err =>{
        console.log("error sending data to cart")
        console.log(err)
        console.log(this.errorMessage)
        // this.errorMessage = this.errorMessage.error.message[0]
    })
  }

}
