import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router,  ActivatedRoute, ParamMap  } from '@angular/router';
import { NetworkService } from '../../services/network';
import { BookService } from '../../services/book'
import { SharedService } from '../../services/sharedservice';


@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.css'],
  providers : [NetworkService, BookService, SharedService]
})
export class BooknowComponent implements OnInit {

  public vendorId
  public date
  public time
  public timestamp
  public comments
  public bookedSlotDate 

  constructor(private router: Router, private route: ActivatedRoute, public bookingservice : BookService, private sharedService : SharedService) {
    this.vendorId = this.sharedService.fetchId();
    console.log(this.vendorId)
   }

  ngOnInit() {
  }

  BookService(){

    this.bookedSlotDate = new Date(this.date);
    console.log(this.bookedSlotDate.getTime()/1000)
    this.timestamp = new Date(this.date +"T"+this.time);

    // alert(time.getTime());
    console.log(this.timestamp.getTime()/1000)

    console.log("date: " + this.date, "time: " + this.time)

    let data = {
      "vendor_id": this.vendorId,
      "slot_index": 4,
      "services": 3,
      "start_slot_time": this.timestamp.getTime()/1000,
      "phone": 10,
      "branch_id": 1,
      "comments": this.comments
    }
    console.log(data)

    
    // this.bookingservice.onBookService(data).subscribe(res=>{

    //   if(status){
    //     console.log(res)
    //   }
    // })
  }

}
