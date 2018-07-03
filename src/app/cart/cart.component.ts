import { Component, OnInit, NgZone } from '@angular/core';
import { Router,  ActivatedRoute, ParamMap  } from '@angular/router';
import { NetworkService } from '../../services/network';
import { CartService } from '../../services/cart'
import { SharedService } from '../../services/sharedservice';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'], 
  providers : [NetworkService, CartService, SharedService]
})
export class CartComponent implements OnInit {

  public errorMessage : any = "";
  public items : any 
  public products = []
  public quantity : number = 1 
  public totalprice  = 0
  public subTotal : number = 0
  public temp = 0
  public total : number = 0
  public vendorId : any

  constructor(private router: Router, private route: ActivatedRoute, public cart : CartService, private sharedService : SharedService, private zone: NgZone) { 
    this.vendorId = this.cart.fetchVendorId()
    console.log(this.vendorId)
  }

  ngOnInit() {
    this.getCart()
    this.getProductPriceWRTQuantity()
    this.totalAmount()

    
  }

  addProducts(){
    this.router.navigate(['/VendorsProfile',this.vendorId]);  
  }

  getCart(){
    this.cart.onGetCart().subscribe(res=>{

      res.status  ? this.items = res.response : console.log("no data found ")
      console.log(res)
      this.products = res.response.products

      console.log(this.products)
    },err =>{
      console.log("not responding")
      console.log(err);
      console.log(this.errorMessage)

    })
  }


  getProductPriceWRTQuantity(){
    this.products.filter(value => {
   
        value.totalprice = value.price * value.quantity 
        console.log(value.totalprice)
        return value.totalprice
    })

    // this.products.map((value) =>{
    //   value.totalprice = value.price * value.quantity
    //   console.log(value.totalprice)
    //   return value.totalprice
    // })
  }

  totalAmount(){
    this.temp = 0
    this.subTotal = 0
    this.products.filter((value) => {
      this.temp = value.quantity * value.price
      this.subTotal = this.temp + this.subTotal
      this.total = this.subTotal + this.items.delivery_fee
    })
    
  }
  clickCounterAdd(cartid){

    this.items.products.map((value) => {
      console.log(" cart id : " + cartid)
      if(value.cart_id == cartid){
        value.quantity = value.quantity + 1
        this.quantity = value.quantity
        this.getProductPriceWRTQuantity()
        this.totalAmount()
        console.log("quantity " + value.quantity + "Q: " + this.quantity )
      } 
    }) 
  }

  clickCounterSub(cartid){

    this.items.products.map((value) => {
    console.log(" cart id : " + cartid)
      if(value.cart_id == cartid){
        if(value.quantity > 0){
          value.quantity = value.quantity - 1
          this.quantity = value.quantity
          this.getProductPriceWRTQuantity()
          this.totalAmount()
          console.log("quantity " + value.quantity)
        }
      }     
    })
  }

      reloadPage() { // click handler or similar
        this.zone.runOutsideAngular(() => {
            location.reload();
        });
    }
  
  
  onUserDeleteProduct(id){

      this.cart.onDeleteCart(id).subscribe(res => {
        console.log(res)
        if(res.status){
          this.items.products = this.items.products.filter((value) => {
          return value.cart_id !== id
          

        })
        this.reloadPage()
        this.totalAmount()
        }
        
      }, 
      err=> {
      console.log(err)
      console.log("item not delete")
      })
  } 
    
  
  incrementQuantity(cart_id){
    this.clickCounterAdd(cart_id)
    var data = {
      "quantity": this.quantity
    }
    console.log(data)
    this.cart.onUpdateCart(cart_id,data).subscribe(res => {
      console.log(res)
      // res.status ? this.clickCounterAdd(cart_id) : console.log('error')
    },
    err => {
      console.log(err)
      console.log("cant update cart")
    })
  }  

  decrementQuantity(cart_id){
    this.clickCounterSub(cart_id)
    var data = {
      "quantity": this.quantity
    }
    console.log(data)
    this.cart.onUpdateCart(cart_id,data).subscribe(res => {
      console.log(res)
      // res.status ? this.clickCounterSub(cart_id) : console.log('error')
    },
    err => {
      console.log(err)
      console.log("cant update cart")
    })
  }
  
  proceedToCheckout(total){
    this.router.navigate(['/Checkout']);
    this.sharedService.send(total)
  }
}
