import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { AdminapicallService } from 'src/app/services/adminapicall.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {

  
  apicall: boolean = false;

  event_name: string = '';
  events: string[] = [];
  ticket_category: string;
  ticket_price: number;
  ticket_available: number;
  eventlist: any[] = [];

  options: any;
  width: number = 240;
  eventObj: any = null;
  redirect: boolean = false;
  subcalled: boolean = false;

  constructor(
    private router: Router,
    private subscribeService: SubscribeService,
    private apicallservice: AdminapicallService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.apicall = true;
    this.options = {
      placeholder: "Search for an Event",
      allowClear: true,
      width: "100%",
    }
    this.subscribeService.eventId.subscribe((id: any) => {
      if (id) {
        this.eventObj = id;
        this.redirect = true;
        this.apicall = false;

      }
      this.loadEvents();
      console.log(this.eventObj);      
    });
  }

  loadEvents(): void {
    this.apicall = true;
    if (!this.eventObj) {
      this.apicallservice.getEventsApi()
      .then((response: HttpResponse<any>) => {
        response.body.forEach(element => {
          let data: any = {
            "eventname": element.eventName,
            "eventid": element.eventId 
          }
          this.events.push(element.eventName);
          this.eventlist.push(data);
          this.apicall = false;

        });
        console.log(this.eventlist);
        console.log(this.events);
      })
    }
  }

  addTicketCategory(stay: number): void {
    this.apicall = true;
    let payload: any = {
      "eventId": this.eventObj.eventid,
      "ticketType": {
        "id": 0,
        "name": this.ticket_category,
        "price": this.ticket_price,
        "number": this.ticket_available
      }
    }
    console.log(payload);
    this.apicallservice.ticketAdd(payload)
    .then((response: HttpResponse<any>) => {
      this.apicall = false;
      if (response.status == 200) {
        console.log('Success');
      } else if (response.status == 204) {
        alert('Ticket Category Already Exists');
      } else {
        console.log(response.body);
      }
      this.ticket_category = '';
      this.ticket_price = null;
      this.ticket_available = null;
      if (stay == 0) {
        this.goBack();
      }
    })
    .catch((e: any) => {
      console.log(e);
    })
  }


  goBack(): void{
    this.router.navigate(['/events']);
  }

}
