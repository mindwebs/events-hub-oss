import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  sideBarOpen = false;

  screenHeight: number;
  screenWidth: number;

  ngOnInit() { }

  sideBarToogler(event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

  constructor(private titleService: Title) {
    this.titleService.setTitle('AgroSmart - DashBoard');
    this.getScreenSize();

    if (this.screenWidth > 760) {
      this.sideBarOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          // console.log(this.screenHeight, this.screenWidth);
    }
}
