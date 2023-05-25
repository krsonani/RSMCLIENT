import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManagerCategoryCrud } from './manager-category-crud';

@Injectable({
  providedIn: 'root'
})
export class ManagerCategoryCrudService {

  url = "http://localhost:8081";

  constructor(private http:HttpClient) { }

  addNewCategory(payload : ManagerCategoryCrud){
    console.log(payload);
    
    return this.http.post(this.url+"/addCategory",payload);
  }

  removeCategoryById(id : Number){
    console.log(id);
    console.log(this.url+"/removeCategory/"+id);
    
    return this.http.delete(this.url+"/removeCategory/"+id);
  }
}
