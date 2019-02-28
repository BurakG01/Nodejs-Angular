import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  flag: Boolean = false;
  errormessageForEmail: String = '';
  errormessageForPasword: String = '';
  errormessage: String = '';
  loginForm: FormGroup;
  constructor(private _myservice: MyserviceService,
  private _location:Location) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
     
    });



  }

  ngOnInit() {
  }



  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }
  // burayi duzenle 
  getNewPass(){
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this._myservice.getNewPassword(this.loginForm.value).toPromise().then((response)=>{

        console.log(response)
     
      }).catch((err)=>{
     
        
      })
    
    }
    
  }

  goBackLogin(){
   this._location.back();
  }


}
