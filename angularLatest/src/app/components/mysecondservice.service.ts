import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable'; //Observable from rxjs library
import 'rxjs/add/operator/map'; // map method from rxjs library
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise'


@Injectable({
  providedIn: 'root'
})
export class MysecondserviceService {

  constructor(private _http: HttpClient) { }
  getUserName() {
    return this._http.get('http://localhost:3000/api/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
 
  deleteUser() {
    return this._http.get('http://localhost:3000/api/delete', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

}
