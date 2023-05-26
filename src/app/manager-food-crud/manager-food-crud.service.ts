import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManagerFoodCrud } from './manager-food-crud';

@Injectable({
  providedIn: 'root'
})
export class ManagerFoodCrudService {

  url = "http://localhost:8081";

  constructor(private http:HttpClient) { }

  addNewFood(payload : ManagerFoodCrud){
    console.log(payload);

    return this.http.post<any>(this.url+"/addFood",payload);
  }

}
