import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAdmincallsService {

  private BASE_URL: string = "https://eventshub-backend-mw.herokuapp.com";
  private username: string = 'admin';
  private password: string = 'admin';
  private usernamePassword: string = `${this.username}:${this.password}`;
  private httpOptions: any = ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(this.usernamePassword)}`
    }),
    observe: 'response'
  })

  constructor(private http: HttpClient) { }

  async getAllUserApi(): Promise<any> {
    const url: string = `${this.BASE_URL}/user`;
    return this.http.get(url, this.httpOptions).toPromise();
  }
}
