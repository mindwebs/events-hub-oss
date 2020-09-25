import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { AdminapicallService } from 'src/app/services/adminapicall.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  apicall: boolean = false;

  dtOptions: DataTables.Settings = {};
  // discounts = [{
  //   id: 1,
  //   code: "DISC20",
  //   percent: 20,
  // }, {
  //   id: 2,
  //   code: "EVENT15",
  //   percent: 15,
  // }, {
  //   id: 3,
  //   code: "TAKEAWAY",
  //   percent: 50,
  // }];

  event_name: string = '';
  listflag: boolean = false;
  options: any;
  width: number = 240;
  eventObj: any;
  eventlist: any[] = [];
  code_name: string;
  code_percent: number;
  geteventObj: any;
  discountList: any[] = [];

  constructor(
    private router: Router,
    private subscribeService: SubscribeService,
    private apicallservice: AdminapicallService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.options = {
      placeholder: "Search for an Event",
      allowClear: true,
      width: "100%",
    }
    this.loadEvents();
  }

  loadEvents(): void {
    if (!this.eventObj) {
      this.apicall = true;
      this.apicallservice.getEventsApi()
      .then((response: HttpResponse<any>) => {
        response.body.forEach(element => {
          let data: any = {
            "eventname": element.eventName,
            "eventid": element.eventId 
          }
          this.eventlist.push(data);
          this.apicall = false;

        });
        // console.log(this.eventlist);
        this.apicall = false;
      });
    }
  }

  addDiscount(): void {
    let payload: any = {
      "eventId": this.eventObj.eventid,
      "discountCode": {
        "id": 0,
        "name": this.code_name,
        "value": this.code_percent
      }
    }
    console.log(payload);
    this.apicallservice.addDiscountApi(payload)
    .then((response: HttpResponse<any>) => {
      if (response.status == 200) {
        console.log('Success');
        location.reload();
      } else if (response.status == 204) {
        alert('Discount Code Already Exists');
      } else {
        console.log(response.body);
      }
      this.code_name = '';
      this.code_percent = null;
    })
    .catch((e: any) => {
      console.log(e);
    })
  }

  getDiscount(): void {
    console.log(this.geteventObj);
    this.apicallservice.getDiscountsApi(this.geteventObj.eventid)
    .then((response: HttpResponse<any>) => {
      response.body.forEach(element => {
        this.discountList.push(element);
      this.listflag = true;
      });
      console.log(this.discountList);
    })
  }


  goBack(): void{
    this.router.navigate(['/events']);
  }

  deleteLocation(id){
    this.discountList.splice(id, 1);
    console.log(id);
  }
}
