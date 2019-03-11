import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  username = '';
  constructor(private myService:MyserviceService,
  private _router: Router) 
  { 
    this.myService.getUserName()
    .subscribe(
      data => this.username= data.toString(),
      error => this._router.navigate(['/main/login'])
    )
  }
  

  ngOnInit() {
  }
  email=''
  /*delete(){
    this.myService.deleteUser().subscribe(
      data=>this.email=data.toString()
    )
    localStorage.removeItem('token');
  }*/
 link(){
  this._router.navigate(['/dash']);
 }

  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/main/login']);
  }
  getBloodGroups(bloodGroup){
    console.log(bloodGroup)
  }
}