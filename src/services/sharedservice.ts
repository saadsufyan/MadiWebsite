import { Injectable , Component} from "@angular/core";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

var temp;
@Injectable()
export class SharedService {

    // public temp;
    public myVar;

    private _stream$ = new BehaviorSubject("");
    public stream$ = this._stream$.asObservable();

    send(id : string) {
    //   this._stream$.next(id);
    //   console.log(this._stream$.next(id))
        temp = id
        console.log(temp)
    }
    sendCategoryId(id: string){
        temp = id
        console.log(temp)
    }

    fetchId() {
        
        // console.log(temp)
        return temp
        
    }

    fetchCategoryId(){
        return temp
    }
    
}