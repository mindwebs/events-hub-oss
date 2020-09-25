import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubscriptionsService } from './subscriptions.service';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {

  public siteTitle = "Events Hub";
  public description = "Description";

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

  constructor(
    private http: HttpClient,
    private subscribeService: SubscriptionsService) { }

  async messageOtpApi(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/user/request_otp`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async getLocationApi(): Promise<any> {
    const url: string = `${this.BASE_URL}/admin/get_location`;
    return this.http.get(url,this.httpOptions).toPromise();
  }
  
  async registerApi(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/user/register`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async loginApi(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/user/login`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async loginTokenApi(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/user/get_session`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async fogotPassApi(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/user/forgot_password`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async validatefogotPassApi(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/user/check_reset_token/${credentials}`;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  async resetPassApi(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/user/reset_password`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async getEventsLocation(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/events/location`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async getEventsId(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/events/id`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async getEvents(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/events`;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  async postID(credentials: any): Promise<any> {
    const url: string = `${this.BASE_URL}/user/add_card`;
    return this.http.post(url, credentials, this.httpOptions).toPromise();
  }

  async getID(credentials: any): Promise<any> {
    let user_token = localStorage.getItem('userToken');;
    const url: string = `${this.BASE_URL}/user/check_id_card/${user_token}`;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  async eventgettypeID(id: any): Promise<any> {
    const url: string = `${this.BASE_URL}/ticket/get_type/${id}`;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  async discountgettypeID(id: any): Promise<any> {
    const url: string = `${this.BASE_URL}/ticket/get_discount/${id}`;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  async getPriceID(cred: any): Promise<any> {
    const url: string = `${this.BASE_URL}/register/get_price`;
    return this.http.post(url, cred, this.httpOptions).toPromise();
  }
}
