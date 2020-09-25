import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  public pfocus: any = '';
  public cfocus: any = '';

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.titleService.getTitle() + ' - Reset Password');
  }
}
