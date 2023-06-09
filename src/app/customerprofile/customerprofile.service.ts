import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class CustomerprofileService {

  url:string = "http://localhost:8081"
  constructor(private htttp:HttpClient) { }

  getCustomer() {
    return this.htttp.get<any>(this.url+"/getSession",{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }
}
