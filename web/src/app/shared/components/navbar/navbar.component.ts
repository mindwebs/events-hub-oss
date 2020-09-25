import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  @Output() toogleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit() {  }

  logout(){
    sessionStorage.removeItem('loginHash');
    sessionStorage.clear();
    //sessionStorage.removeItem('loginHash');
    //this.cookieService.deleteAll();
    this.cookieService.delete('user_email');
    // this.router.navigateByUrl('/setup');
  }

  settings(){    
    //this.cookieService.delete('propertyId');
    this.cookieService.delete('controllerId');
    // this.router.navigateByUrl('/setup/selectProperty');
  }

  help(){        
    // this.router.navigateByUrl('/help');
  }

  toogleSideBar() {
    this.toogleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
