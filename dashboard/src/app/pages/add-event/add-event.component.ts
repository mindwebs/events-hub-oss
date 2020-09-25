import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminapicallService } from 'src/app/services/adminapicall.service';
import { HttpResponse } from '@angular/common/http';
import { SubscribeService } from 'src/app/services/subscribe.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, AfterViewInit {

  apicall: boolean = false;

  singleDay: boolean = true;
  eventName: string;
  host: string;
  about: string;
  description: string;
  startdate: Date = new Date();
  enddate: Date = new Date();
  starttime: string = '11:00';
  endtime: string = '17:00';
  public daterange: any = {};
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };
  sellersPermitStringBg: string;
  sellersPermitStringEvent: string;
  sellersPermitFileBg: any;
  sellersPermitFileEvent: any;
  imgURL: any;
  imageSrc: any;
  finalJson: {} = {};
  currentId: number = 0;
  submitEnable: boolean = true;
  bgfile: string;
  eventfile: string;
  bgflag: boolean = false;
  eventflag: boolean = false;
  videolink: string;
  monthConvertor: Object = {
    "Jan": "01",
    "Feb": "02",
    "Mab": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
  };
  locationList: string[] = []; //list of location
  location: string;

  constructor(
    private router: Router,
    private apicallservice: AdminapicallService,
    private route: ActivatedRoute,
    private subscribeService: SubscribeService
  ) { }

  ngOnInit(): void {
    this.apicall = true;
    this.apicallservice.getLocationApi()
    .then((response: HttpResponse<any>) => {
      response.body.forEach(element => {
        this.locationList.push(element.location);
        this.apicall = false;
      });
    })
    .catch((e: any) => {
      console.log(e);
      this.apicall = false;
    });
    console.log(this.locationList);
  }
 
  public selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
    this.startdate = new Date(value.start);
    this.enddate = new Date(value.end);
    console.log(this.enddate);
  }

  changedDate(event): void {
    console.log(event);
    // this.startdate = event;
  }


  ngAfterViewInit(): void {
  }

  goBack(): void{
    this.router.navigate(['/events']);
  }

  public pickedImage(event, field) {
    console.log(event);
    this.currentId = field;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (field == 1) {
        this.sellersPermitFileBg = file;
        this.bgfile = file.name;
        this.bgflag = true;
        this.handleInputChange(file); //turn into base64
      } else {
        this.sellersPermitFileEvent = file;
        this.eventfile = file.name;
        this.eventflag = true;
        this.handleInputChange(file); //turn into base64
      }
    }
    else {
      alert("No file selected");
    }
  }

  handleInputChange(files) {
    var file = files;
    this.submitEnable=true;
    var pattern1 = /image-*/;
    var reader = new FileReader();
    this.imgURL = "";
    if (!file.type.match(pattern1)) {
      alert('invalid format');
      return;
    } else {
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }
    }
    this.submitEnable=false;
    
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    let id = this.currentId;
    switch (id) {
      case 1:
        this.sellersPermitStringBg = base64result;
        break
      case 2:
        this.sellersPermitStringEvent = base64result;
        break
    }
  }

  createEvent(): void {
    if (this.eventName == null || this.eventName == '' || this.host == null || this.host == '' || this.about == null || this.about == '' || this.description == null || this.description == '' || this.startdate == null || this.enddate == null || this.starttime == null || this.starttime == '' || this.endtime == null || this.endtime == '') {
      alert("Fill up all mandatory fields");
    } else {
      let start_month: string = this.monthConvertor[this.startdate.toString().split(' ')[1]];
      let start_date_string = start_month + '-' + this.startdate.toString().split(' ')[2] + '-' +  this.startdate.toString().split(' ')[3]
      let end_month: string = this.monthConvertor[this.enddate.toString().split(' ')[1]];
      let end_date_string = end_month + '-' + this.enddate.toString().split(' ')[2] + '-' +  this.enddate.toString().split(' ')[3]
      let payload: any = {
        "eventName": this.eventName,
        "eventSummary": this.about,
        "eventDescription": this.description,
        "eventStartDate": start_date_string,
        "eventEndDate": end_date_string,
        "eventStartTime": this.starttime,
        "eventEndTime": this.endtime,
        "eventOwner": this.host,
        "eventSmallPic": this.sellersPermitStringEvent,
        "eventHeaderPic": this.sellersPermitStringBg,
        "eventVideo": this.videolink,
        "location": this.location
      }
      console.log(payload);
      this.apicall = true;
      this.apicallservice.eventAdd(payload)
      .then((response: HttpResponse<any>) => {
        console.log("Success");
        this.redirectToTicket(response.body['eventId'])
        this.apicall = false;
      }).catch((e: any) => {
        console.log(e);
        this.apicall = false;
      })
    }
  }

  redirectToTicket(eventId: any): void {
    let data: Object = {
      "eventname" : this.eventName,
      "eventid": eventId
    }
    this.subscribeService.setEventId(data);
    this.router.navigate(['../add-category'], { relativeTo: this.route, })
    .catch();
  }

}
