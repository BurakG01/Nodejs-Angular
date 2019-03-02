import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { City } from '../models/cityInfo.model';
import { TestBed } from '@angular/core/testing';
import { Address } from 'ngx-google-places-autocomplete/objects/address';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']


})


export class RegisterComponent implements OnInit {
  
  myForm: FormGroup;
  flag: Boolean = false;
  errormessage: String = '';
  successMessage: String = '';
  constructor(private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {

    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator),
      bloodGroup: new FormControl(null, Validators.required),
      phone_number: new FormControl(null, Validators.required),
      address:new FormControl(null,Validators.required),
      location:new FormControl(null,Validators.required),
      isBenefactor:new FormControl(null)
    });
   
    this.myForm.controls.password.valueChanges
      .subscribe(
        x => this.myForm.controls.cnfpass.updateValueAndValidity()
      );



  }

   ngOnInit() {
    this.myForm.patchValue({isBenefactor:false})
  }

  isValid(controlName) {

    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }
 
  handleAddressChange(address: Address){
   
  this.myForm.patchValue({location:address})
  }
 

  register() {
    //console.log(this.myForm.value)
    if (this.myForm.valid) {
   
      this._myservice.submitRegister(this.myForm.value)
        .toPromise().then((response) => {
          //console.log(this.myForm.value)
          this.toastr.success('Registration Success');
          setTimeout(() => {
            
            this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
        }, 5000); 
          


          this.successMessage = 'Registration Success'
        }).catch((err) => {

          this.flag = true;
          this.errormessage = err.error.message;
        })
    }
  }

  movetologin() {
    this._router.navigate(['../login'], { relativeTo: this._activatedRoute });
  }

 
}



