import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable'; //Observable from rxjs library
import 'rxjs/add/operator/map'; // map method from rxjs library
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise'
import {City}  from './models/cityInfo.model'
import { ArrayType } from '@angular/compiler/src/output/output_ast';




@Injectable()
export class MyserviceService {

 
  constructor(private _http: HttpClient) { }
  getConfirmationCode(body:any)  {

    return this._http.post('http://localhost:3000/api/getconfirmationcode', body,{
      observe:'body'
    })
  }

  getUpdatePass(body:any){
    return this._http.post('http://localhost:3000/api/updatepassword', body,{
      observe:'body'
    })
  }
  getSearchData(body:any){
    return this._http.post('http://localhost:3000/api/search', body,{
      observe:'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  }


  submitRegister(body:any){
    return this._http.post('http://localhost:3000/api/register', body,{
      observe:'body'
    });
  }

   login(body:any)  {

    return this._http.post('http://localhost:3000/api/login', body,{
      observe:'body'
    })
  }

  getUserName() {
    return this._http.get('http://localhost:3000/api/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
getRecordStatistics() {
    return this._http.get('http://localhost:3000/api/recordstatistics', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getUserInfo() {
    return this._http.get('http://localhost:3000/api/userinfo', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  UpdateProfile(body:any) {
    return this._http.post('http://localhost:3000/api/update',body, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  UploadProfilePicture(body:any) {
    return this._http.post('http://localhost:3000/api/profile-picture',body, {
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
  async getCities()  {
    const response= await this._http.get('http://localhost:3000/api/cities', {
        observe:'body'
        
      }).toPromise().then((res:any)=>{
       
         
        return res
      }).catch((err)=>{
        console.log(err)
      })
      return response
    }

    async getTowns(id)  {
      let url='http://localhost:3000/api/towns/'+id
      const response= await this._http.get(url, {
          observe:'body'
          
        }).toPromise().then((res:any)=>{
         
           
          return res
        })
        return response
      }
      async getDistricts(id)  {
        let url='http://localhost:3000/api/districts/'+id
        const response= await this._http.get(url, {
            observe:'body'
            
          }).toPromise().then((res:any)=>{
           
             
            return res
          })
          return response
        }

        async getNeighborhoods(id)  {
          let url='http://localhost:3000/api/neighborhoods/'+id
          const response= await this._http.get(url, {
              observe:'body'
              
            }).toPromise().then((res:any)=>{
             
               
              return res
            })
            return response
          }
	
}
