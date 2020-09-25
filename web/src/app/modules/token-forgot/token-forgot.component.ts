import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { tokenName } from '@angular/compiler';
import { ApicallsService } from '../../services/apicalls.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-token-forgot',
  templateUrl: './token-forgot.component.html',
  styleUrls: ['./token-forgot.component.scss']
})
export class TokenForgotComponent implements OnInit {

  public ufocus: any = '';
  public u2focus: any = '';
  emailid: string;
  password: string;
  confirmpassword: string;
  regexPwd: RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  token: string = '';
  validtok: boolean = true;


  constructor(
    private titleService: Title,
    private apicallService: ApicallsService,
    public router: Router,
    private route: ActivatedRoute
    ) {
      this.token = this.route.snapshot.paramMap.get('id');
      console.log(this.token);
     }

  ngOnInit(): void {
    this.titleService.setTitle(this.titleService.getTitle() + ' - Reset Password');
    this.apicallService.validatefogotPassApi(this.token)
    .then((response: HttpResponse<any>) => {
      if (response.status == 200) {
        this.validtok = true;
      } else {
        this.validtok = false;
      }
    }).catch((e: any) => {
      this.validtok = false;
      console.log(e);
    });
  }

  resetPassword(): void {
    if (this.password == this.confirmpassword) {
      if (this.regexPwd.test(this.password)) {
        let payload: any = {
          "token": this.token,
          "newPassword": sha256(this.password)
        }
        this.apicallService.resetPassApi(payload)
        .then((response: HttpResponse<any>) => {
          if (response.status == 200) {
            this.router.navigate(['../../login'], { relativeTo: this.route })
            .catch();
          } else {
            console.log('Error');
          }
        })
        .catch((err: any) => {
          alert("There was an error in resetting password. Please try again.");
          console.log(err);
        })
      } else {
        alert("Choose a strong password");
      }
    } else {
      alert("Passwords don't Match.");
    }  
  }

}
