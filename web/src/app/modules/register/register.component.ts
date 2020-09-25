import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApicallsService } from '../../services/apicalls.service'
import { HttpResponse, HttpClient } from '@angular/common/http';
import { sha256 } from 'js-sha256';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nfocus: any = '';
  ufocus: any = '';
  pfocus: any = '';
  cfocus: any = '';
  lfocus: any = '';
  afocus: any = '';
  options: any = '';

  locationList: string[] = []; //list of location
  otpchecked: boolean = false;
  otpsent: boolean = false;
  otp: string;
  apiotp: string;
  showModal: boolean = false;
  
  name: string;
  password: string;
  confirmpassword: string;
  profilepic: string;
  emailid: string;
  mobile: number;
  location: string;
  regexPwd: RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  img: any = "data:image/png;base64,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";
  apicall: boolean = false;

  constructor(
    private titleService: Title,
    private apicallService: ApicallsService,
    public router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.options = {
      placeholder: "Select your Home City",
      allowClear: true,
      width: "100%",
    }
    this.titleService.setTitle(this.apicallService.siteTitle + ' - Register');
    this.apicallService.getLocationApi()
    .then((response: HttpResponse<any>) => {
      // console.log(response);
      response.body.forEach(element => {
        // console.log(element);
        this.locationList.push(element.location);
      });
    })
    .catch((e: any) => {
      console.log(e);
    });
    console.log(this.locationList);
  }

  getOtp(): void {
    this.otpsent = false;
    this.otpchecked = false;
    let payload: any = {
      "email": this.emailid
    }
    this.apicall = true;
    this.apicallService.messageOtpApi(payload)
    .then((response: HttpResponse<any>) => {
      this.apicall = false;
      if (response.status == 200) {
      this.apiotp = response.body['otp'];
      this.otpsent = true;
      } else {
        alert("Email already registered");
        this.emailid = "";
      }
    })
    .catch((err: any) => {
      this.apicall = false;
      console.log(err);
    });
  }

  verifyOtp(): void {
    if (sha256(this.otp) == this.apiotp) {
      this.otpchecked = true;
    } else {
      alert("OTP Does not match");
    }
  }

  registerUser(): void {
    if (this.password == this.confirmpassword) {
      console.log(this.mobile);
      if(this.mobile.toString().length == 10) {
        if (this.regexPwd.test(this.password)) {
          let payload: any = {
            "username": this.name,
            "password": sha256(this.password),
            "role": "user",
            "email": this.emailid,
            "location": this.location,
            "pic": this.img,
            "mobile": this.mobile
          }
          this.apicall = true;
          this.apicallService.registerApi(payload)
          .then((response: HttpResponse<any>) => {
            this.apicall = false;
            // this.redirectLogin()
            this.showModal = true;
          })
          .catch((err: any) => {
            this.apicall = false;
            alert("There was an error in registration. Please try again.");
            console.log(err);
          })
        } else {
          alert("Choose a strong password");
        }
      } else {
        alert("Mobile number should be of 10 digits");
      }

    } else {
      alert("Passwords don't Match.");
    }   
  }

  redirectLogin(): void {
    this.router.navigate(['../login'], { relativeTo: this.route })
    .catch();
  }

}
