import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})

export class ProductService{
    private basicUrl = "http://34.214.14.69/madinatibackend/public/api/user/" 
    constructor(public network: NetworkService){} 

    onCategoryVendorProductDeals(vendor_id, deal_id){

        let url = this.basicUrl + "vendor/" + vendor_id + "/deals/" + deal_id + "/details?page=1&limit=1000";
        return this.network.doGet(url)        
    }

    onAddon(product_id){

        let url = this.basicUrl + "vendor/product/" + product_id + "/detail?page=1&limit=1000";
        return this.network.doGet(url)          
    }
}