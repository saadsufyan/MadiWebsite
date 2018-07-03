import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { NetworkService } from './network'


@Injectable()
@Component({})
export class UserActionsService{
    private basicUrl = "http://34.214.14.69/madinatibackend/public/api/user/"
    constructor(public network: NetworkService){

    }
    onUserSignup(data) : Observable<any> {
        let url = this.basicUrl + "signup";
        return this.network.doPut(url,data)

    }
    onUserLogin(data) : Observable<any> {
        let url = this.basicUrl + "login";
        return this.network.doPost(url,data)
    }
    onForgetPassword(data) : Observable<any> {
        let url = this.basicUrl + "forget";
        return this.network.doPost(url,data)
    }
    onLoginSignupFacebook(data){
        let url = this.basicUrl + "connect/facebook";
        return this.network.doPost(url,data)    
    }
    onUpdateProfilePicture(data) : Observable<any> {
        let url = this.basicUrl + "update/profile";
        return this.network.doPostPictures(url,data)
    }
    onUploadPicture(data) : Observable<any> {
        let url = this.basicUrl + "update/avatar";
        return this.network.doPostPictures(url,data)
    }
    onUpdateProfile(data){
        let url = this.basicUrl + "update/profile";
        return this.network.doPost(url,data)
    }
    onUserLogout() : Observable<any> {
        let url = this.basicUrl + "logout";
        return this.network.doGet(url)
    }
}