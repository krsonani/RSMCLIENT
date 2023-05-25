import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

url = "http://localhost:8081"

  constructor(private http:HttpClient) { 
    
  }

  addUser(payload : Register ){
    return this.http.post(this.url+"/addUser",payload)
    
  }

}
