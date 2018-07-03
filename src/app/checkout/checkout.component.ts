import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute, ParamMap  } from '@angular/router';
import { NetworkService } from '../../services/network';
import { CartService } from '../../services/cart'
import { SharedService } from '../../services/sharedservice';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers : [NetworkService, CartService, SharedService]
})
export class CheckoutComponent implements OnInit {


  public lat : any
  public long : any
  public instructions : any
  public payment : any
  public branch :any
  public delivery :any
  public totalprice : number = 0
  public filter: boolean = false
  
  constructor(private router: Router, private route: ActivatedRoute, public cart : CartService, private sharedService : SharedService) { 

    this.totalprice = this.sharedService.fetchId()
    console.log(this.totalprice)
  }

  ngOnInit() {
  }

  showFilter(){
    this.filter == true ? this.filter = false : this.filter = true
  }

  onBuyProduct(name,phone, address){
    if(name != undefined || phone !=undefined || address !=undefined){

      let data = {
        "name": name,
        "phone": phone,
        "address": address,
        "lat": this.lat,
        "long" : this.long,
        "instructions" : this.instructions,
        "payment_method" : this.payment,
        "branch_id" : this.branch,
        "delivery" : this.delivery
      }

      console.log(data)

      this.cart.onBookCart(data).subscribe(res=>{
        console.log(res)
        if(res.status){
          this.router.navigate(['/Payment']);
        }
      }, err=>{
        console.log(err)
        console.log("Api not working")
      })
      
    }
    else{
      

    }

  }


}
