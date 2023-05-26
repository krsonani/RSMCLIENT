import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    
    return this.http.post<any>(this.url+"/addCategory",payload);
  }

  removeCategoryById(id : Number){
    console.log(id);
    console.log(this.url+"/removeCategory/"+id);
    
    return this.http.delete<any>(this.url+"/removeCategory/"+id);
  }

  getAllCategories(){
    
    return this.http.get<any>(this.url+"/getAllCategory");
  }

}
