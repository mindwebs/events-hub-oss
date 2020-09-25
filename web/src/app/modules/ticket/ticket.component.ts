import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { ApicallsService } from 'src/app/services/apicalls.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ticket_id: string = '';
  paid: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private apicallsService: ApicallsService
  ) { }

  ngOnInit(): void {
    this.ticket_id = this.activatedRoute.snapshot.paramMap.get('id');

  }

}
