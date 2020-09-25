import { Component, OnInit, HostListener, Sanitizer } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { ApicallsService } from 'src/app/services/apicalls.service';
import { HttpResponse } from '@angular/common/http';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @HostListener('window:scroll', ["$event"]) handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= 320) {
      this.text_show = false;
    } else {
      this.text_show = true;
    }
  }

  public id: string;
  text_show: boolean = true;
  apicall: boolean = true;
  showModal: boolean = false;

  name: string;
  location: string;
  end_exists: boolean;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  rating: number;
  video_id: string = null;
  video_link: any;
  video: boolean = false;
  owner: string = '';
  summary: string = '';
  description: string = '';
  event_id: string = '';
  background_image : string = "/assets/img/slider1.png";
  event_image: string = "assets/img/event_img.jpg";

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private sanitizer: DomSanitizer,
    private apicallsService: ApicallsService,
    private subscribeService: SubscriptionsService,
    public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);
    let payload: any = {
      "id": this.id
    }

    this.titleService.setTitle(this.apicallsService.siteTitle);


    this.apicallsService.getEventsId(payload)
      .then((response: HttpResponse<any>) => {
        this.apicall = false;
        if (response.status == 200) {
          console.log(response.body);
          let elem = response.body;
          this.name = elem.eventName;
          this.location = elem.location;
          if(elem.status == "active")
            this.end_exists = true;
          else
            this.end_exists = false;
          this.start_date = elem.eventStartDate;
          this.end_date = elem.eventEndDate;
          this.start_time = elem.eventStartTime;
          this.end_time = elem.eventEndTime;
          this.rating = 4;
          this.owner = elem.eventOwner;
          this.summary = elem.eventSummary;
          this.description = elem.eventDescription;
          if(elem.eventVideo){
            this.video = true;
            this.video_id = elem.eventVideo;
            let videolink = "https://youtube.com/embed/"+ this.video_id +"?autoplay=1&controls=0&loop=1&showinfo=0&autohide=1&mute=1";
            this.video_link = this.getVideoURL(videolink);
          } else {
            this.video = false;
          }
          // console.log(response.body);
          this.apicall = false;
          this.background_image = "data:image/png;base64," + elem.eventHeaderPic;
          this.event_image = "data:image/png;base64," + elem.eventSmallPic;
          this.event_id = this.id.toString().padStart(3, '0');
          this.titleService.setTitle(this.apicallsService.siteTitle + " - " + this.name);
        }
      });
  }


  getVideoURL(videolink) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videolink);
  }

  purchase(): void {
    this.subscribeService.setEventId(this.id);
    this.apicall = true;

    
    this.apicallsService.getID(null)
    .then((response: HttpResponse<any>) => {
      this.apicall = false;
      if (response.status == 200) {
        this.router.navigate(['../../purchase'], { relativeTo: this.route }).catch();
      } else if (response.status == 204) {
        this.showModal = true;
      } else {
        console.log(response);
      }
    })
    .catch((err: any) => {
      this.apicall = false;
      console.log(err);
    });
    // this.router.navigate(['../../purchase'], { relativeTo: this.route })
    // .catch();
  }

  redirect(){
    this.router.navigate(['../../upload-proof'], { relativeTo: this.route }).catch();
  }
}
