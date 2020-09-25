import { Component, OnInit } from '@angular/core';
import { VarsService } from 'src/app/services/vars.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  apicall: boolean = false;
  dtOptions: DataTables.Settings = {};
  options: any;

  event_selected: boolean = false;

  event_name: string = '';
  type: string = '';
  payment: string = '';
  types: [];
  events: string[] = ["Event A", "Event B", "Event C"];

  constructor(
    private vars: VarsService
  ) { }

  ngOnInit(): void {
    this.vars.currentPage = "tickets";
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };
    this.options = {
      allowClear: true,
      width: "100%",
    }
  }

  eventChange(event): void {
    if (this.event_name != null) {
      console.log(event);
      this.event_name = event;
      // Fetch the Types
      this.event_selected = true;
    } else {
      this.event_selected = false;
    }
  }

  typeChange(event): void {
    console.log(event);
  }

  payChange(event): void {
    console.log(event);
  }

}
