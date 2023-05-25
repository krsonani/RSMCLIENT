import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8081"

  constructor(private http :HttpClient) { }

  coustomerLogin(customerLogin :Login)
  {
      return this.http.post<any>(this.url+"/getUser",customerLogin);
  }
}
