import { Component, OnInit,Input } from '@angular/core';
import {searchDataInterface} from '../components/navbar/searchDataInterface'
import { MyserviceService } from '../myservice.service';
declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  locations=new Array();
   searchData={} as searchDataInterface;
  constructor(private _myservice:MyserviceService) { }

  ngOnInit() {
  
   this.searchData.blodGroupAndCity= localStorage.getItem('searchValue')
   this._myservice.getSearchData(this.searchData).toPromise().then((response:any)=>{
     //this.locations=[['adasdsad',36.8222629000000,36.189834099999985,3]]
     var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: new google.maps.LatLng(39.91987, 32.85427),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  
    var infowindow = new google.maps.InfoWindow();
  
    var marker, i;
    
  
    for (i = 0; i < response.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(response[i][1], response[i][2]),
        map: map
      });
  
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent("<div class='card card-user>"+
          "<div class='card-body'> <div class='author'> <a href='#''>"   +
          "<img class='avatar border-gray' src='../assets/img/mike.jpg' alt='...'>"+
          "<h5 class='title'>"+response[i][0][1]+"</h5></a> <p class='description text-center'>"+response[i][0][0]+" </p>"+
          "<p class='description text-center'>"+response[i][0][2]+" </p> </div>"+
          "<p class='description text-center'> 'Lamborghini Mercy<br> Your chick she so thirsty"+
          "<br> I'm in that two seat Lambo'</p></div><hr><div class='button-container'>"+
          "<button href='#' class='btn btn-neutral btn-icon btn-round btn-lg'> <i class='fab fa-facebook-f'></i>"+
          " </button><button href='#' class='btn btn-neutral btn-icon btn-round btn-lg'>   <i class='fab fa-twitter'></i></button>"+
          "  <button href='#' class='btn btn-neutral btn-icon btn-round btn-lg'>"+
          "<i class='fab fa-google-plus-g'></i>  </button></div></div>");
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  
   })



    
  }

  
  


 

}
