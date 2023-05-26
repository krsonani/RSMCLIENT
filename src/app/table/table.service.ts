import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  url = "http://localhost:8081"

  constructor(private http:HttpClient) { }

  showTable()
  {
    return this.http.get<any>(this.url+"/getAllTables",{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    });
  }

  changeStatus(table:any)
  {
    return this.http.post<any>(this.url+"/toggleTableStatus",table,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    })
  }
}
