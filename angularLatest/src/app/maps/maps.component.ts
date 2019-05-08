import { Component, OnInit, Input } from '@angular/core';
import { searchDataInterface, City } from '../components/navbar/searchDataInterface'
import { MyserviceService } from '../myservice.service';
import { MysecondserviceService } from '../components/mysecondservice.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  options = new Array()
  locations = new Array();
  searchData = {} as searchDataInterface;
  city = {} as City
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  constructor(private _myservice: MyserviceService, 
    private mySecondService: MysecondserviceService) {
    /*this.mySecondService.getSearchData().toPromise().
    then((response: searchDataInterface[]) => {
      response.map((iter, index) => {
        this.options[index] = iter.blodGroupAndCity
      })
    })*/
    this.mySecondService.getBloodAndCity().toPromise().then((response:string[])=>{
     this.options=response
    })

  }

  ngOnInit() {


    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))

      )
    this.city.City = localStorage.getItem('city')
    console.log(this.city)

    this._myservice.getSearchData(this.city).toPromise().
    then((response: any) => {
      this.drawMaps(response);

    })
  }

  SearcValue() {
    this.searchData.blodGroupAndCity = this.myControl.value
    this._myservice.getSearchData(this.searchData).toPromise().
    then((response: any) => {

      this.drawMaps(response)

    })

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private drawMaps(response) {
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

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          //burayi sonra duzelt
          infowindow.setContent("<div class='card card-user>" +
            "<div class='card-body'> <div class='author'> <a href='/maps'><p class='description text-center'>" +
            "<img class='avatar border-gray' src='../assets/img/mike.jpg' alt='...'></p> " +
            "<h5 class='title'>" + response[i][0][0] + "</h5></a> <p class='description text-center'>" + response[i][0][1] + " </p>" +
            "<p class='description text-center'>" + response[i][0][2] + " </p> </div>" +
            "<hr><div class='button-container'>" +
            "<button href='#' class='btn btn-neutral btn-icon btn-round btn-lg'> <i class='fab fa-facebook-f'></i>" +
            " </button><button href='#' class='btn btn-neutral btn-icon btn-round btn-lg'>   <i class='fab fa-twitter'></i></button>" +
            "  <button href='#' class='btn btn-neutral btn-icon btn-round btn-lg'>" +
            "<i class='fab fa-google-plus-g'></i></button></div></div>");
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }

}
