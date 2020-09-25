import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicalls.service';
import { Title } from '@angular/platform-browser';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  apicall: boolean = false;

  nfocus: any = '';
  efocus: any = '';
  pfocus: any = '';
  dfocus: any = '';
  afocus: any = '';
  tfocus: any = 'focus';

  showModal: boolean = false;
  id: any;
  name: string;
  email: string;
  phone: string;
  discount: string;
  address: string;
  no_tickets: number = 1;
  max_tickets: number = 10;

  price: number = 300;

  type_selected : string;
  types: string[] = ["Single", "Enterprise", "Corporate"];
  ticketcategory: any[] = [];
  discountcodes: any[] = [];
  width: number = 240;
  options: any;
  dicselected: any;
  ticketselected: any;
  pricetot: any;

  constructor(
    private titleService: Title,
    private apicallService: ApicallsService,
    private subscribeService: SubscriptionsService,
    public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.apicallService.siteTitle + ' - Purchase Ticket');
    this.subscribeService.eventId.subscribe((id: any) => {
      if (id) {
        this.id = id;
      } else {
        this.router.navigate(['../home'], { relativeTo: this.route })
        .catch();
      }
    })
    this.apicallService.eventgettypeID(this.id)
    .then((res: HttpResponse<any>) => {
      // this.apicall = false;
      if (res.status == 200) {
        res.body.forEach(element => {
          this.ticketcategory.push(element);
        });
      }
    })
    .catch((e: any) => {
      this.apicall = false;
      console.log(e);
    })

    this.apicallService.discountgettypeID(this.id)
    .then((res: HttpResponse<any>) => {
      // this.apicall = false;
      if (res.status == 200) {
        res.body.forEach(element => {
          this.discountcodes.push(element);
        });
      }
    })
    .catch((e: any) => {
      this.apicall = false;
      console.log(e);
    })

  }

  purchase(){
    let payload: any = {
      "eventId": this.id,
      "ticketType": this.ticketselected,
      "discountCode": this.dicselected 
    }
    this.apicallService.getPriceID(payload)
    .then((res: HttpResponse<any>) => {
      // this.apicall = false;
      if (res.status == 200) {
        this.pricetot = res.body['price'];
        alert('Purchased at' + this.pricetot);
      }
    })
    .catch((e: any) => {
      this.apicall = false;
      console.log(e);
    })


  }

  redirectPurchase(){
    
  }

}
