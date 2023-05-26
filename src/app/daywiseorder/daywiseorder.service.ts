import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DaywiseorderService {

  url = "http://localhost:8081";
  constructor(private http :HttpClient) { }
  showDayWiseOrders()
  {
      return this.http.get(this.url+"/getOrderByCurrentDate");
  }
  getOrderByUserId(id:String){

      return this.http.get(this.url+"/getOrderByUserId/"+id);
  }
}
