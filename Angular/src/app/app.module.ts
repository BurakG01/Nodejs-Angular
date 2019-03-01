import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainDeskComponent } from './main-desk/main-desk.component';

import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material';

import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import {MyserviceService} from './myservice.service';
import { HttpClientModule } from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask'
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DemoMaterialModule} from './lib';    
import {MatNativeDateModule} from '@angular/material';   
import {MatIconModule} from '@angular/material/icon';
import { ToastrModule,ToastContainerModule  } from 'ngx-toastr';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";


import { OrderModule } from 'ngx-order-pipe';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';

@NgModule({
  declarations: [
   
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    MainDeskComponent,
    ForgotpassComponent,
   
  ],
  imports: [
    DemoMaterialModule,
    MatFormFieldModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NgxPhoneMaskModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    OrderModule,
    MatIconModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
    GooglePlaceModule
  ],
  providers: [ MyserviceService],
  
  bootstrap: [AppComponent],
  
})
export class AppModule { }
