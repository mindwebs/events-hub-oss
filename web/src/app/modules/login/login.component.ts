import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApicallsService } from 'src/app/services/apicalls.service';
import { HttpResponse } from '@angular/common/http';
import { sha256 } from 'js-sha256';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ufocus: any = '';
  pfocus: any = '';

  underlineColor: "#38d39f";

  email: string;
  password: string;
  rememberme: boolean = true;
  token: string;
  apicall: boolean = false;

  constructor(
    private titleService: Title,
    private apicallService: ApicallsService,
    private subscribeService: SubscriptionsService,
    public router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.apicallService.siteTitle + ' - Login');
    this.token = localStorage.getItem('userToken');
    if (this.token != '') {
      this.checkToken();
    }
  }

  loginUser(): void {
    let errors: any;
    if (!this.email) {
      errors = "Email Address Empty";
    } else if (!this.password) {
      errors = "Password Empty";
    }

    let payload: any = {
      "password": sha256(this.password),
      "email": this.email
    }
    if (!errors) {
      this.apicall = true;
      this.apicallService.loginApi(payload)
        .then((response: HttpResponse<any>) => {
          this.apicall = false;
          if (response.status == 200) {
            console.log('Login Successful');
            this.email = '';
            this.password = '';
            this.token = response.body['token']
            if (this.rememberme == true) {
              localStorage.setItem('userToken', this.token);
            }
            this.subscribeService.setUserData(this.token);
            this.checkToken();
          } else {
            console.log('Login Failed');
          }
        })
        .catch((err: any) => {
          this.apicall = false;
          console.log(err);
        })
    } else {
      alert(errors);
    }
  }

  checkToken(): void {
    let load: any = {
      "token": this.token
    };
    this.apicall = true;
    this.apicallService.loginTokenApi(load)
    .then((res: HttpResponse<any>) => {
      this.apicall = false;
      if (res.status == 200) {
        this.subscribeService.setUserData(this.token);
        this.subscribeService.setUserName(res.body['username']);
        this.subscribeService.setUserDP(res.body['profilepic']);
        this.subscribeService.setUserLogin(res.body['lastLoggedIn']);
        this.redirectHome();
      }
    })
    .catch((e: any) => {
      this.apicall = false;
      console.log(e);
    })
  }

  redirectHome(): void {
    this.router.navigate(['../home'], { relativeTo: this.route })
    .catch();
  }

}
