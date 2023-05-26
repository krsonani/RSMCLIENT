import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Updateprofile } from './updateprofile';

@Injectable({
  providedIn: 'root'
})
export class CustomerupdateprofileService {

  url: string = "http://localhost:8081"
  constructor(private http: HttpClient) { }

  getCustomer() {
    return this.http.get<any>(this.url + "/getSession", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }

  updateCustomerProfile(payload: Updateprofile) {
    return this.http.put(this.url + '/updateUser', payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }

}





