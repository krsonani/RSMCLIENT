import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerTableHandlerService {
  url = "http://localhost:8081";
  constructor(private http:HttpClient) { }
  getSurplusUsers()
  {
    return this.http.get(this.url+"/getSurplusUsersList",{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }
  getUsersById(id:string){
    return this.http.get(this.url+"/getUserById/"+id,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }
  showTable()
  {
    return this.http.get<any>(this.url+"/getAllTables",{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    });
  }
  assignTables(assignedTables:string[],uid:string)
  {
    return this.http.post<any>(this.url+"/handleTable/"+uid,assignedTables,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    });
  }

}
