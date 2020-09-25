import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApicallsService } from 'src/app/services/apicalls.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {

  public ufocus: any = '';
  emailid: string;
  popupModal: boolean = false;
  


  constructor(
    private titleService: Title,
    private apicallService: ApicallsService,
    public router: Router,
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.titleService.setTitle(this.titleService.getTitle() + ' - Forgot Password');
  }

  sendForgotMail(): void {
    let payload: any = {
      "email": this.emailid
    };
    this.apicallService.fogotPassApi(payload)
    .then((response: HttpResponse<any>) => {
      if (response.status == 200) {
        this.popupModal = true;
      } else {
        this.popupModal = false;
      }
    }).catch((e: any) => {
      this.popupModal = false;
      console.log(e);
    });
  }

}
