import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { AdminapicallService } from 'src/app/services/adminapicall.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  apicall: boolean = false;
  info: any;

  constructor(
    private router: Router,
    private subscribeService: SubscribeService,
    private apicallservice: AdminapicallService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.apicall = true;
    this.apicallservice.getDashboardApi()
    .then((response: HttpResponse<any>) => {
      this.info = response.body['info'];
      // console.log(response.body);
      this.apicall = false;
    })
  }

}
