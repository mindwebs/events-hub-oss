import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicalls.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cityselector',
  templateUrl: './cityselector.component.html',
  styleUrls: ['./cityselector.component.scss']
})
export class CityselectorComponent implements OnInit {

  city_selected : string;
  cities: string[] = ["Kolkata", "Delhi", "Mumbai", "Noida", "Pune", "Bangalore", "Chennai", "Hyderabad"];
  // select_cities: string[] = ["Kolkata", "Delhi", "Mumbai", "Noida", "Pune", "Bangalore", "Chennai", "Hyderabad", 
  //                            "Gurgaon", "Ahmedabad", "Jaipur", "Agra", "Lucknow", "Shimla"];
  select_cities: string[] = [];
  options: any;
  width: number = 240;
  dataAvailable: boolean = false;

  constructor(
    private apicallService: ApicallsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.apicallService.getLocationApi()
    .then((response: HttpResponse<any>) => {
      // console.log(response);
      response.body.forEach(element => {
        // console.log(element);
        this.select_cities.push(element.location);
      });
      this.dataAvailable = true;
    })
    .catch((e: any) => {
      console.log(e);
      this.dataAvailable = false;
    });
    // console.log(this.select_cities);

  }

  selectCity(city: string):void {
    this.city_selected = city.toLowerCase();
    console.log(this.city_selected);
    localStorage.setItem("my_city", this.city_selected);
    this.onChangeReload();
  }

  onChangeReload(): void{
    window.location.reload();
  }

}
