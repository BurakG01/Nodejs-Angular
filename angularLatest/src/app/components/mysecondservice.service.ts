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


@Injectable({
  providedIn: 'root'
})
export class MysecondserviceService {
  private productUrl = 'api/searchdata/searchData.json';
  constructor(private _http: HttpClient) { }

  getSearchData(): Observable<searchDataInterface[]> {
    return this._http.get<searchDataInterface[]>(this.productUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      
    );
  }


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
