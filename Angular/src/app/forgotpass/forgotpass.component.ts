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
  passwordForm: FormGroup;
  constructor(private _myservice: MyserviceService,
  private _location:Location,
  private _toastr: ToastrService) {
    this.passwordForm = new FormGroup({
      email: new FormControl(null, Validators.required),
     
    });



  }

  ngOnInit() {
  }



  isValid(controlName) {
    return this.passwordForm.get(controlName).invalid && this.passwordForm.get(controlName).touched;
  }
  // burayi duzenle 
  getNewPass(){
    

    if (this.passwordForm.valid) {
      this._myservice.getNewPassword(this.passwordForm.value).toPromise().then((response:any)=>{
           
          
        this._toastr.success(response.message);

        
     
      }).catch((err)=>{
        console.log(err)
         this._toastr.error(err.error.message)
        
      })
    
    }
    
  }

  goBackLogin(){
   this._location.back();
  }


}
