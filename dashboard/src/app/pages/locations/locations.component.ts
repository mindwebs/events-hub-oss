import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminapicallService } from 'src/app/services/adminapicall.service';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { HttpResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  apicall: boolean = false;
  dtOptions: DataTables.Settings = {};
  locationList: any[] =[];
  listflag: boolean = false;
  locationName: string;

  constructor(
    private router: Router,
    private apicallservice: AdminapicallService,
    private route: ActivatedRoute,
    private subscribeService: SubscribeService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.apicall = true;
    this.apicallservice.getLocationApi()
    .then((response: HttpResponse<any>) => {
      response.body.forEach(element => {
        this.locationList.push(element);
        this.apicall = false;
        this.listflag = true;
      });
    })
  }

  deleteLocation(id){
    this.locationList.splice(id, 1);
    console.log(id);
  }

  addLocation(): void {
    this.apicall = true;
    let payload: any = {
      "location": this.locationName
    }
    this.apicallservice.locationAdd(payload)
    .then((response: HttpResponse<any>) => {
      console.log('Success');
      this.apicall = false;
      location.reload();
    })
    .catch((e: any) => {
      console.log(e);
    })
  }
}
