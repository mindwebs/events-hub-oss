import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Input() location: String;
  title: string;
  img: string;
  
  constructor() { }

  ngOnInit(): void {
    this.title = this.location.toUpperCase();
    this.img = this.location.toLowerCase();
  }

}
