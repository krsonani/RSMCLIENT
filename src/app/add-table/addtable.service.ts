import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Addtable } from './addtable';

@Injectable({
  providedIn: 'root'
})
export class AddtableService {

  url:string = "http://localhost:8081"
  constructor(private http : HttpClient) { }

  addTable(table:Addtable)
  {
   return this.http.post<any>(this.url+"/addTable",table);
  }


}
