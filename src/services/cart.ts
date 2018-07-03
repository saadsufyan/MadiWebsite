import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'

var temp;

@Injectable()
@Component({})

export class CartService{
    private basicUrl = "http://34.214.14.69/madinatibackend/public/api/user/" 
    constructor(public network: NetworkService){} 


    onAddtoCart(data){

        let url = this.basicUrl + "cart";
        return this.network.doPut(url,data)          
    }
    onGetCart(){
        let url = this.basicUrl + "cart";
        return this.network.doGet(url)
    }

    onDeleteCart(id) : Observable<any> {
        let url = this.basicUrl + "cart/"+id;
        return this.network.doDelete(url) 
    }

    onUpdateCart(id,data){
        
        let url = this.basicUrl + "cart/"+id;
        return this.network.doPost(url,data) 
    }
     
    onBookCart(data) : Observable<any> {
        let url = this.basicUrl + "cart/book";
        return this.network.doPut(url,data) 
    }
    sendVendorId(id: string){
        temp = id
        console.log(temp)
    }
    fetchVendorId(){
        return temp
    }

}