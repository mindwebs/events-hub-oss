import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminapicallService {

  private BASE_URL: string = "https://eventshub-backend-mw.herokuapp.com";
  private username: string = 'admin';
  private password: string = 'mindwebs';
  private usernamePassword: string = `${this.username}:${this.password}`;
  private httpOptions: any = ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(this.usernamePassword)}`
    }),
    observe: 'response'
  })

  constructor(private http: HttpClient) { }

  async eventAdd(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/events/add`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async ticketAdd(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/ticket/add_type`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async locationAdd(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/admin/add_location`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async getLocationApi(): Promise<any> {
    const url: string = `${this.BASE_URL}/admin/get_location`;
    return this.http.get(url,this.httpOptions).toPromise();
  }

  async getEventsApi(): Promise<any> {
    const url: string = `${this.BASE_URL}/events`;
    return this.http.get(url,this.httpOptions).toPromise();
  }

  async getDiscountsApi(eventid: any): Promise<any> {
    const url: string = `${this.BASE_URL}/ticket/get_discount/${eventid}`;
    return this.http.get(url,this.httpOptions).toPromise();
  }

  async deleteDiscountsApi(payload: any): Promise<any> {
    const url: string = `${this.BASE_URL}/ticket/delete_discount`;
    return this.http.post(url, payload, this.httpOptions).toPromise();
  }

  async addDiscountApi(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/ticket/add_discount`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async getDiscountApi(): Promise<any> {
    const url: string = `${this.BASE_URL}/events`;
    return this.http.get(url,this.httpOptions).toPromise();
  }

  async getUsersApi(): Promise<any> {
    const url: string = `${this.BASE_URL}/user`;
    return this.http.get(url,this.httpOptions).toPromise();
  }

  async makeAdminApi(payload: any): Promise<any> {
    const url: string = `${this.BASE_URL}/admin/make_admin`;
    return this.http.post(url, payload, this.httpOptions).toPromise();
  }

  async makeUserApi(payload: any): Promise<any> {
    const url: string = `${this.BASE_URL}/admin/remove_admin`;
    return this.http.post(url,payload, this.httpOptions).toPromise();
  }

  async getDashboardApi(): Promise<any> {
    const url: string = `${this.BASE_URL}/admin/infos`;
    return this.http.get(url,this.httpOptions).toPromise();
  }
}
