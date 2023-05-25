import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class CustomerprofileService {

  url = "http://localhost:8081"

  constructor(private http:HttpClient) { }

  getCustomerProfile(payload : Profile ){
    return this.http.get(this.url+"/getUser")   
  }
}
