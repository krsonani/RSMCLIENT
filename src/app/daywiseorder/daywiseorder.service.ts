import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DaywiseorderService {

  url = "http://localhost:8081";
  constructor(private http :HttpClient) { }
  showDayWiseOrders()
  {
      return this.http.get(this.url+"/getOrderByCurrentDate",{
        headers:new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `${sessionStorage.getItem("jwtToken")}`
        })
      });
  }
  
  getOrderByUserId(id:String){
      return this.http.get(this.url+"/getOrderByUserId/"+id,{
        headers:new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `${sessionStorage.getItem("jwtToken")}`
        })
      });
  }
  
  getCustomer() {
    return this.http.get<any>(this.url+"/getSession",{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }

  updateBillGenerationStatus(userId:string){
    return this.http.get(this.url+"/updateBillStatus/"+userId,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    });
  }
}
