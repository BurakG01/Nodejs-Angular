import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MainDeskComponent } from './main-desk/main-desk.component';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material';
import { MyserviceService } from './myservice.service';   
import { NgxMaskModule } from 'ngx-mask'
import { DemoMaterialModule } from './lib';
import { MatNativeDateModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { ForgotpassComponent } from './forgotpass/forgotpass.component';








@NgModule({
  imports: [
    MatIconModule,
    MatNativeDateModule,
    DemoMaterialModule,
    NgxMaskModule.forRoot(),
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    GooglePlaceModule,
    ToastContainerModule,
    ReactiveFormsModule
  ],
  declarations: [
    MainDeskComponent,
    RegisterComponent,
    UserDashboardComponent,
    LoginComponent,
    AppComponent,
    AdminLayoutComponent,
    ForgotpassComponent,

  ],
  providers: [MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
