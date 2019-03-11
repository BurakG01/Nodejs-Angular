import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  myForm: FormGroup;
  constructor(private _myservice: MyserviceService,) {

    this.myForm = new FormGroup({
    
      username: new FormControl(null, Validators.required),
      bloodGroup: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      phone_number: new FormControl(null, Validators.required),
      location:new FormControl(null,Validators.required),
      password: new FormControl(null, Validators.required),
      isBenefactor:new FormControl(null)
     
    });

    this._myservice.getUserInfo().toPromise().then((response:any)=>{
      this.myForm.controls['username'].setValue(response.username);
      this.myForm.controls['bloodGroup'].setValue(response.bloodGroup);
      this.myForm.controls['email'].setValue(response.email);
      this.myForm.controls['location'].setValue(response.location);
      this.myForm.controls['isBenefactor'].setValue(response.isBenefactor);
      this.myForm.controls['phone_number'].setValue(response.phone_number);

    })
  
   }

  

  ngOnInit() {
  }

  handleAddressChange(address: Address){
   
  
    }
   
  UpdateProfile(){
    console.log(this.myForm.value)
  }
}
