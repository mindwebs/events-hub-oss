import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  city: string = '';

  isCityOpen: boolean = false;
  public isCollapsed: boolean = true;
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(
    private subscribeService: SubscriptionsService,
    public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    if(localStorage.getItem("my_city")){
      this.city = localStorage.getItem("my_city");
    } else {
      this.city = 'Location';
    }
    this.subscribeService.userData.subscribe((usertoken: any) => {
      if (usertoken) {
        this.isLoggedIn = true;
      }
    });
    this.subscribeService.userName.subscribe((uname: any) => {
      if (uname) {
        this.username = uname;
        this.username = this.username.split(' ')[0];
      }
    });
  }

  toggleCity(): void{
    this.isCityOpen = !this.isCityOpen;
    if(this.isCityOpen){
      this.isCollapsed = true;
    }
  }

  logout() {
    localStorage.setItem('userToken', '');
    this.subscribeService.setUserData(null);
    this.subscribeService.setUserName(null);
    this.subscribeService.setUserDP(null);
    this.subscribeService.setUserLogin(null);
    this.isLoggedIn = false;
    this.username = '';
  }

  isActive(instruction: string): boolean {
    return this.router.isActive(instruction, true);
  }

}
