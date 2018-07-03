import { Injectable , Component} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()

export class NetworkService{
    
    public ios_Client_key : string = 'bWFkaW5hdGktYXBwLWlvczoyODJmOTU5ZS0zZTdmLTQyODAtYWEyMi00MDY4YmJjMTM4OGM=';
    public android_client_key : string = 'bWFkaW5hdGktYXBwLWFuZHJvaWQ6MjgyZjk1OWUtM2U3Zi00MjgwLWFhMjItNDA2OGJiYzEzODhj';

    constructor(public http : Http){

    }
    doPost(url,postdata) : any {
        return this.http.post(url,postdata, this.getHeaders()).map(res => res.json());
    }
    doPut(url,postdata) : any {
        return this.http.put(url,postdata, this.getHeaders()).map(res => res.json());
    }
    doGet(url) : any {
        return this.http.get(url, this.getHeaders()).map(res => res.json());
    }
    doDelete(url) : any {
        return this.http.delete(url, this.getHeaders()).map(res => res.json());
    }
        
    doPostPictures(url,postdata) : any {
        return this.http.post(url, postdata, this.getMultiPartHeaders()).map(res =>  res.json())
    }

    getMultiPartHeaders() : any {
        let user = JSON.parse(localStorage.getItem('user')) 
        var token = user.access_token
         var header = {
            'Authorization': 'Bearer '+ token            
        };
        console.log(header)
        let headers = new Headers(header);
        let options = new RequestOptions({ headers: headers });
        return options;
    }
    
    getHeaders() : any {
        let userIsLoggedIn : any = localStorage.getItem('isLoggedIn');
        console.log(userIsLoggedIn, 'from network layer')
        if(userIsLoggedIn == "true"){
            let user = JSON.parse(localStorage.getItem('user'))
            var token = user.access_token
            return this.getAuthHeaders(token)
        }
        else if (userIsLoggedIn == "false"){
            return this.getClientHeaders();
        }
        else{
            return this.getClientHeaders();
        }
    }

    getClientHeaders() : any {
        var header = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic' + ' ' + this.android_client_key,
            'client-id': ' madinati-app-android'
        };
        let headers = new Headers(header);
        let options = new RequestOptions({headers:headers});
        return options;
    }

    getAuthHeaders(token): any{
        var header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
        let headers = new Headers(header);
        let options = new RequestOptions({headers:headers});
        return options;
    }
}