import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { AdminapicallService } from 'src/app/services/adminapicall.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  apicall: boolean = false;
  dtOptions: DataTables.Settings = {};
  userlist: any[] = [];
  listflag: boolean = false;

  constructor(
    private router: Router,
    private subscribeService: SubscribeService,
    private apicallservice: AdminapicallService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.apicall = true;
    this.apicallservice.getUsersApi()
    .then((response: HttpResponse<any>) => {
      response.body.forEach(element => {
        this.userlist.push(element);
        this.listflag = true;
      });
      // console.log(this.userlist);
      this.apicall = false;
    })
  }

  makeAdmin(user: any): void {
    this.apicall= true;
    let payload: any = {
      "email": user.email
    }
    this.apicallservice.makeAdminApi(payload)
    .then((response: HttpResponse<any>) => {
      console.log('Success');
      location.reload();
      this.apicall = false;
    }).catch((e: any) => {
      console.log(e);
      this.apicall = false;
    })
  }

  removeAdmin(user: any): void {
    let payload: any = {
      "email": user.email
    }
    this.apicallservice.makeUserApi(payload)
    .then((response: HttpResponse<any>) => {
      console.log('Success');
      location.reload();
    }).catch((e: any) => {
      console.log(e);
    })
  }

}
