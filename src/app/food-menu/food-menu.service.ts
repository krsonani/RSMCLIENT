import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodMenuService {

  url = "http://localhost:8081";
  
  constructor(private http:HttpClient) { }

  getAllFood(){
    
    return this.http.get<any>(this.url+"/getAllFood");
  }

}
