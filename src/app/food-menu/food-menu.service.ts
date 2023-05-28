import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodMenuService {

  url = "http://localhost:8081";
  
  constructor(private http:HttpClient) { }

  getAllFood(){
    
    return this.http.get<any>(this.url+"/getAllFood",{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    });
  }

  toggleGivenFood(id : number){

    return this.http.put<any>(this.url+"/toggleFoodAvailability/"+id,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("jwtToken")}`
      })
    });
  }
}
