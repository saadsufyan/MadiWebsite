import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'

var temp;

@Injectable()
@Component({})

export class CategoryService{
    private basicUrl = "http://34.214.14.69/madinatibackend/public/api/user/"
    constructor(public network: NetworkService){} 

    onUserCategory(category_name, lang){
        let url = this.basicUrl + "category?search=" + category_name  + "&lang=" + lang;
        return this.network.doGet(url)        
    }

    onCategoryVendor(category_id,lat, long){
        let url = this.basicUrl + "categories/vendor/" + category_id + "?page=1&limit=1000&lat=" + lat + "&long=" + long;
        return this.network.doGet(url)
    }

    onCategoryVendorProduct(category_id, vendor_id){
        let url = this.basicUrl + "vendor/" + category_id + "/details?vendor=" + vendor_id;
        return this.network.doGet(url)
    }

    sendCategoryId(id: string){
        temp = id
        console.log(temp)
    }
    fetchCategoryId(){
        return temp
    }

}