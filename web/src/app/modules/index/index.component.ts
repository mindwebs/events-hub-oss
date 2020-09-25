import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApicallsService } from 'src/app/services/apicalls.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  token: any;
  apicall: boolean = false;

  nearby_events = [];

  constructor(
    private subscribeService: SubscriptionsService,
    private titleService: Title,
    private apicallService: ApicallsService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchEvents();
    this.subscribeService.userData.subscribe((usertoken: any) => {
      if (!usertoken) {
        this.token = localStorage.getItem('userToken');
        if (this.token != '') {
          this.checkToken();
        }
      }
    });
    // setInterval(function() {this.carousel_fn()}, 3000);
    if(1){
      let x = setInterval(() => { this.carousel_fn(); }, 3000);
    }
    this.titleService.setTitle("Events Hub - Description");
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
        }
      })
      .catch((e: any) => {
        this.apicall = false;
        console.log(e);
      })
  }

  fetchEvents(){
    this.apicall = true;
    let my_city = localStorage.getItem("my_city");
    if(!my_city){
      my_city = "kolkata";
    }
    let payload: any = {
      "location": my_city
    }

    this.apicallService.getEventsLocation(payload)
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
          
              this.nearby_events.push(event);
            });
            // console.log(response.body);
            this.apicall = false;
          } else {
            this.apicall = false;
          }
        });

  };

  count = -62.8;
  btn_count = 1;
  carousel_fn() {    
      var container = document.getElementById("carousel-container");
      var buttons = document.getElementById("buttons-id");
      // var button = buttons.children;
      // if (this.btn_count != 0)
      //   button[this.btn_count - 1].style.backgroundColor = "gray";
      // else
      //   button[button.length - 1].style.backgroundColor = "gray"
      // button[this.btn_count].style.backgroundColor = "#ffffff";
      this.btn_count++;
      if (this.count == 0)
        this.count = -62.8;
      else
        this.count = this.count - 75.3;
      container.style.transform = "translateX(" + String(this.count) + "vw)";
      if (this.count == -364) {
        this.btn_count = 0;
        this.count = 0;
      }
  }

}
