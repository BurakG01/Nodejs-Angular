import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import {NotificationObj} from '../notificationConfig'
import{environment} from '../../environments/environment'
import { Router } from '@angular/router';

declare var bootbox:any
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

 
  myForm: FormGroup;
  country:''
  city:''
  postal_code:'';
 /* notificationObjForSuccess={
    timeOut: 5000,
    closeButton: true,
    enableHtml: true,
    toastClass: "alert alert-success alert-with-icon",
    positionClass: 'toast-top-right'
  } as NotificationObj
  notificationObjForError={
    timeOut: 5000,
    closeButton: true,
    enableHtml: true,
    toastClass: "alert alert-danger alert-with-icon",
    positionClass: 'toast-top-right'
  } as NotificationObj*/

  
  
  constructor( private _myservice: MyserviceService,
    private toastr:ToastrService,
    private _router: Router) {

    this.myForm = new FormGroup({
    
      username: new FormControl(null, Validators.required),
      bloodGroup: new FormControl(null),
      email: new FormControl(null, Validators.email),
      phone_number: new FormControl(null, Validators.required),
      address:new FormControl(null,Validators.required),
     // password: new FormControl(null, Validators.required),
      isBenefactor:new FormControl(null),
      location:new FormControl(null)
     
    });

    this._myservice.getUserInfo().toPromise().then((response:any)=>{

      this.country=response.country;
     
      this.city=response.city;
      this.postal_code=response.postal_code
      this.myForm.controls['username'].setValue(response.username);
      this.myForm.controls['bloodGroup'].setValue(response.bloodGroup);
      this.myForm.controls['email'].setValue(response.email);
      this.myForm.controls['address'].setValue(response.address);
      this.myForm.controls['isBenefactor'].setValue(response.isBenefactor);
      this.myForm.controls['phone_number'].setValue(response.phone_number);
      this.myForm.controls['location'].setValue(response.location);
    })

   
  
   }

  

  ngOnInit() {
    

    
  }
  isValid(controlName) {

    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }


  handleAddressChange(location: Address){
   
    this.myForm.controls['location'].setValue(location);
    }
   
  UpdateProfile(){
    if (this.myForm.valid){
      this._myservice.UpdateProfile(this.myForm.value).toPromise().then((response:any)=>{
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>'+response.message, '',
        environment.notificationObjForSuccess);

      }).catch((err)=>{
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>'+err.error.message, '',
         environment.notificationObjForError);
      })
    }

    else {
      this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Please fill all mandotary fields', '',
       environment.notificationObjForError);
    }
  }

  deleteAccount(){
    bootbox.confirm({
      message: "Are you sure that you want to delete your account ?",
      buttons: {
          confirm: {
              label: 'Yes',
              className: 'btn-success'
          },
          cancel: {
              label: 'No',
              className: 'btn-danger'
          }
      },
      callback: (result)=> {
        if(result){
          this._myservice.deleteUser().toPromise().then((response)=>{

            this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Your account was deleted !', '',
            environment.notificationObjForSuccess);

            setTimeout(() => {
            
              localStorage.removeItem('token');
            this._router.navigate(['/main/login']);
          }, 5000); 
            
            
          }).catch((err)=>{

          })
        }
      }
  });
  }
}
