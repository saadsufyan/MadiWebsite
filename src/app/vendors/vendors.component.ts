import { Component, OnInit, Input,  ViewChild, ElementRef } from '@angular/core';
import { NetworkService } from '../../services/network';
import {CategoryService } from '../../services/category'
import { Router,  ActivatedRoute, ParamMap  } from '@angular/router';
import { SharedService } from '../../services/sharedservice';
import { AgmCoreModule } from '@agm/core';

import 'rxjs/add/operator/switchMap';

declare var google;

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
  providers : [NetworkService, CategoryService,  SharedService]
})
export class VendorsComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  loc : any
  public vendorList : any 
  public categoryId : any
  public lat : any
  public long : any 
  public cId
  public errorMessage : any = ""
  @Input() temp: string ;

  public vendorLat 
  public vendorLong
  public marker
  public show : boolean = true
  
  constructor(private router: Router, private route: ActivatedRoute, public category : CategoryService, private sharedService : SharedService) {

  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params['id'];
    console.log("category Id: " + this.categoryId)  
    this.category.sendCategoryId(this.categoryId)
    this.getCurrentLocation()
    // this.initializeMapWithMultiplelocation()
    


  }
  recieveCategoryId(id : string){

    console.log(id)
  }
  
  goToVendorProducts(id){
    this.router.navigate(['/VendorsProfile',id]);  
  }

  getCurrentLocation(){


   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log("latitude " + this.lat + " " + "Longitude " + this.long); 

        this.getVendors(this.lat,this.long)
        // this.loadMap()
      });
   }

  }
  getVendors(lat,long){

    console.log("category ID = " + this.categoryId + " latitude = " + this.lat + " Longitude = " + this.long)
    
    this.category.onCategoryVendor(this.categoryId,lat,long).subscribe(res => {
      console.log(res)
      res.status && res.response.length > 0 ? this.vendorList = res.response : console.log("error getting data")

    var map = new google.maps.Map(document.getElementById('locationmap'), {
    zoom: 13,
    center: new google.maps.LatLng(this.vendorList[0].lat, this.vendorList[0].long),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI : true
    });

    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for(i = 0; i < this.vendorList.length; i++){

      
      // console.log(latLng)

    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(this.vendorList[i].lat, this.vendorList[i].long),
        title : this.vendorList[i].name

    });         

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        console.log(this.vendorList[i].name)
      infowindow.setContent(this.vendorList[i].name, this.vendorList[i].name);
      infowindow.open(map, marker);
      
      }
    })(marker, i));

      }

    },err =>{
      console.log("not responding")
      console.log(err);
      console.log(this.errorMessage)                                    

    })
  }

    showMap(){
      this.show = false
      console.log("in show ")
    }
    hideMap(){
      this.show = true
      console.log("in hide ")
    }

 
    }
 
  
      

