import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  url:string = "http://localhost:8081"
  constructor(private http:HttpClient) { }

  getCustomer()
  {
    return this.http.get<any>(this.url+"/getSession",{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }
  addtoQueue(id:string,qty:number)
  {
    return this.http.get<any>(this.url+"/addToWaitingListForAnySittingTable/"+id+"/"+qty,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }

  validateJwtToken()
  {
    return this.http.get<any>(this.url+"/api/verifytoken",{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }
}
