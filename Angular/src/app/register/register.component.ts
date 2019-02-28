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



declare interface AddressInfo {
  name: string;
  id: string;
  location?: {
    lat: string;
    lon: string;
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']


})



export class RegisterComponent implements OnInit {

  townsInfo: AddressInfo[] = [];
  citiesInfo: AddressInfo[] = [];
  districtsInfo: AddressInfo[] = [];
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
      city: new FormControl(null, Validators.required),
      town: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),

    });

    this.myForm.controls.password.valueChanges
      .subscribe(
        x => this.myForm.controls.cnfpass.updateValueAndValidity()
      );



  }

  async getTowns(selectedCityId: any) {
    this.townsInfo.length = 0;
    const response = await this._myservice.getTowns(selectedCityId)
    response.data.map((iter) => {
      this.townsInfo.push({
        name: iter.name, id: iter._id, location: {
          lat: iter.geolocation.lat,
          lon: iter.geolocation.lon
        }
      })
    })
    console.log(this.townsInfo)

  }
  async getDistricts(SelectedTownId: any) {
    this.districtsInfo.length = 0;
    const response = await this._myservice.getDistricts(SelectedTownId)
    if (response.data.length > 3) {
      response.data.map((iter) => {
        this.districtsInfo.push({ name: iter.name, id: iter._id })
      })
    } else {
      const response = await this._myservice.getNeighborhoods(SelectedTownId)
      response.data.map((iter) => {
        this.districtsInfo.push({ name: iter.name, id: iter._id })
      })
    }

    console.log(this.districtsInfo)
  }

  test(item: any): void {
    console.log(item)
  }
  async ngOnInit() {
    const response = await this._myservice.getCities()
    console.log(response)
    response.data.map((iter) => {

      this.citiesInfo.push({
        name: iter.name, id: iter._id, location: {
          lat: iter.geolocation.lat,
          lon: iter.geolocation.lon
        }
      })
    })

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

  register() {
    if (this.myForm.valid) {
      this._myservice.submitRegister(this.myForm.value)
        .toPromise().then((response) => {
          this.toastr.success('Registration Success');


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



