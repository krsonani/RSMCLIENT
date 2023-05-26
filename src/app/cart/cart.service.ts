import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url: string = "http://localhost:8081"

  constructor(private http: HttpClient) { }

  addOrder(order: Order) {
    return this.http.post(this.url + "/addOrder", order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    });
  }

}
