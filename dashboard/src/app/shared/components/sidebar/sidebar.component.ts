import { Component, OnInit } from '@angular/core';
import { VarsService } from 'src/app/services/vars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isCollapsed: boolean = false;
  selected: string = '';

  constructor(
    private vars: VarsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selected = this.vars.currentPage;
  }

  isActive(instruction: string): boolean {
    return this.router.isActive(instruction, true);
  }

}
