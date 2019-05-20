import { Component, OnInit, Input } from '@angular/core';
import { MysecondserviceService } from '../mysecondservice.service';
import { ToastrService } from 'ngx-toastr';
import {environment} from '../../../environments/environment';
import { Router } from '@angular/router';
import { from } from 'rxjs';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: '' },
  { path: '/maps', title: 'Maps Search', icon: 'location_map-big', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'users_single-02', class: '' },
 //{ path: '/icons', title: 'Icons', icon: 'education_atom', class: '' },
 
//  { path: '/notifications', title: 'Notifications', icon: 'ui-1_bell-53', class: '' },

 
  //{ path: '/table-list', title: 'Table List', icon: 'design_bullet-list-67', class: '' },
  //{ path: '/typography', title: 'Typography', icon: 'text_caps-small', class: '' },
 // { path: '/upgrade', title: 'Upgrade to PRO', icon: 'objects_spaceship', class: 'active active-pro' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 
  username = '';
  menuItems: any[];
   constructor(private mySecondService:MysecondserviceService,
     private _router: Router,
     private toastr: ToastrService) { 
       this.mySecondService.getUserName().toPromise().then((response:any)=>{
       console.log(response)
       this.username= response.username
       localStorage.setItem('city',response.city);
       })
     
 
     }

  ngOnInit() {
    this.mySecondService
    .getNotification()
    .subscribe((message: string) => {
     // this.messages.push(message);
     if (message){

      this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> NEW RECORD  <b>success</b> - '+ message, '',
      environment.notificationObjForSuccess
   );
       console.log(message)

     }
    });

    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
}
