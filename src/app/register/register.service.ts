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
    return this.http.post<any>(this.url+"/verifyNewUserOtp",payload);

  }

  sendOtp(email:string)
  {
    return this.http.get<any>(this.url+"/verifyNewUser/"+email)
  }

  addManager(payload:Register)
  {
    return this.http.post<any>(this.url+"/addManager",payload);
  }
}
