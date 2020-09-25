import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApicallsService } from 'src/app/services/apicalls.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = [];
  apicall: boolean = false;

  constructor(
    private titleService: Title,
    private apicallService: ApicallsService
  ) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(){
    this.apicall = true;
    // let payload: any = {
    //   "location": "kolkata"
    // }

    this.apicallService.getEvents('')
        .then((response: HttpResponse<any>) => {
          this.apicall = false;
          if (response.status == 200) {
            response.body.forEach(element => {
              // console.log(element);
              let event = {
                name: element.eventName,
                id: element.eventId,
                link: "/event/" + element.eventId,
                start_date: element.eventStartDate,
                end_date: element.eventEndDate,
                location: element.location,
                image: element.eventSmallPic,
                about: element.eventSummary
              };
              this.events.push(event);
              this.apicall = false;
            });
            // console.log(response.body);
          }
        });

  };

}
