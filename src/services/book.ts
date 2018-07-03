import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})

export class BookService{
    private basicUrl = "http://34.214.14.69/madinatibackend/public/api/user/" 
    constructor(public network: NetworkService){} 

    onBookService(data){
        let url = this.basicUrl + "service/booking";
        return this.network.doPut(url,data)  
    }

}