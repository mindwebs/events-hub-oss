import { Component, OnInit, AfterViewInit } from '@angular/core';
// import * as $ from 'jquery';
// declare var $:any;
// import $ = require('jquery')
import * as $ from 'jquery';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})

export class EventsComponent implements OnInit, AfterViewInit {
  apicall: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {

  }

}
