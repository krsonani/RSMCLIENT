import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  url:string = "http://localhost:8081"
  constructor(private htttp:HttpClient) { }

  getCustomer()
  {
    return this.htttp.get<any>(this.url+"/getSession",{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }
  addtoQueue(id:string,qty:number)
  {
    return this.htttp.get<any>(this.url+"/addToWaitingListForAnySittingTable/"+id+"/"+qty,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }
}
