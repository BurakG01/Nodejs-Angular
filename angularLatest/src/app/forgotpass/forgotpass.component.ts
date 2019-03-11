import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import { ToastrService } from 'ngx-toastr';
import { validateConfig } from '@angular/router/src/config';




declare interface USERINFORMATION {
  password: string;
  email: string;
}

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})


export class ForgotpassComponent implements OnInit {

  userinformation={} as USERINFORMATION
  
  errormessageForEmail: String = '';
  errormessageForPasword: String = '';
  errormessage: String = '';
  emailSend:Boolean = false;
  confirmationcode:String='';
  passwordForm: FormGroup;
  updatePassword: FormGroup;
  _activatedRoute: ActivatedRoute;
  constructor(private _myservice: MyserviceService,
  private _location:Location,
  private _toastr: ToastrService,
  private _router: Router,) {
    this.updatePassword=new FormGroup({
      confirmationCode:new FormControl(null,[Validators.max(5),Validators.required] ),
      password:new FormControl(null, Validators.required),
      reEnterPass:new FormControl(null, this.passValidator),
    })
    this.passwordForm = new FormGroup({
      email: new FormControl(null, Validators.required),
     
    });

    this.updatePassword.controls.password.valueChanges
    .subscribe(
      x => this.updatePassword.controls.reEnterPass.updateValueAndValidity()
    );
  
  }

  ngOnInit() {
    
  }
  isValid(controlName) {
    return this.passwordForm.get(controlName).invalid && this.passwordForm.get(controlName).touched;
  }
  isValidForUpdatePassword(controlName) {
    return this.updatePassword.get(controlName).invalid && this.updatePassword.get(controlName).touched;
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
  // burayi duzenle 
  getConfirmationCode(){
    
    if (this.passwordForm.valid) {
      this.userinformation.email=this.passwordForm.value.email;
      
      this._myservice.getConfirmationCode(this.passwordForm.value).toPromise().then((response:any)=>{
       
        console.log(response.confirmationCode)
        this.confirmationcode=response.confirmationCode;
        this.emailSend=true;
       
        this._toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> '+response.message, '', {
          timeOut: 5000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-top-right'
        });
        
      }).catch((err)=>{

        
        
        this._toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>'+err.error.message, '', {
          timeOut: 8000,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-top-right'
        
    
      })
      })
    }
    
  }
  goBackLogin(){
   
   this._location.back();
  }


  getUpdatePass(){

   
  if(this.updatePassword.valid){
      this.userinformation.password=this.updatePassword.get('password').value;
     this._myservice.getUpdatePass(this.userinformation).toPromise().then((response:any)=>{

      this._toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> '+response.message, '', {
        timeOut: 5000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: 'toast-top-right'
      });
         setTimeout(() => {
           this._location.back();
         }, 5000);
  
      
     }).catch((err)=>{
      this._toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>'+err.error.message, '', {
        timeOut: 8000,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-top-right'
      
  
    })

     })

    }

  }



}
