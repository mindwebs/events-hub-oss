import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VarsService {

  public currentPage : string = '';
  private route: string = '';

  constructor() { }

  public getPage(): string{
    return this.currentPage;
  }

  public setPage(page): void {
    this.currentPage = page;
  }
}
