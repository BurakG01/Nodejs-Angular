import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/operator/toPromise'
import { ToastrService } from 'ngx-toastr';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  flag: Boolean = false;
  errormessageForEmail:String='';
  errormessageForPasword:String='';
  errormessage:String='';
  loginForm: FormGroup;
  constructor(private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    

  }

  ngOnInit() {
   
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this._myservice.login(this.loginForm.value).toPromise().then((response)=>{
        localStorage.setItem('token',response.toString());
        this._router.navigate(['/dash']);
      }).catch((err)=>{
       // this.errormessage=err.error.message
        this.flag = true;
        
        if(err.error.message=='User email is not registered.')
        this.errormessageForEmail=err.error.message
        if(err.error.message==' Invalid Credentials')
        this.errormessageForPasword=err.error.message
        
      })
    
    }
  }

  movetoregister() {
   
    this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
  }

  moveToGetPass(){
        this._router.navigate(['../forgotpass'], { relativeTo: this._activatedRoute });
  }
}
