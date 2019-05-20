import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {searchDataInterface} from './navbar/searchDataInterface'
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; //Observable from rxjs library
import 'rxjs/add/operator/map'; // map method from rxjs library
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise'
import { from } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MysecondserviceService {
  private url = 'http://localhost:3000';
  private socket;    

  /*private productUrl = 'api/searchdata/searchData.json';

  getSearchData(): Observable<searchDataInterface[]> {
    return this._http.get<searchDataInterface[]>(this.productUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      
    );
  }*/
  constructor(private _http: HttpClient) {

    this.socket = io(this.url);
   }
   public getNotification = () => {
    return Observable.create((observer) => {
        this.socket.on('notification', (message) => {
            observer.next(message);
        });
    });
}

  getUserName() {
    return this._http.get('http://localhost:3000/api/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  getBloodAndCity() {
    return this._http.get('http://localhost:3000/api/getbloodandcity', {
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
