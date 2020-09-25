import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApicallsService } from 'src/app/services/apicalls.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  name: string = "Dipan Roy";
  email: string = "dipanroy12@gmail.com";
  message: string = '';
  message2: string = '';


  constructor(
    private titleService: Title,
    private apicallsService: ApicallsService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.apicallsService.siteTitle + " - Account Settings");
  }

  changePassword():void {
    this.message = "Password Changed";
  }

  changeDetails():void {
    this.message2 = "Details Changed";
  }

  uploadProfilePic(){

  }

  uploadIdProof(){
    
  }
}
