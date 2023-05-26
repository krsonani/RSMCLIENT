import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login';
import { OtpForm } from './otp-form';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8081"

  constructor(private http :HttpClient) { }

  coustomerLogin(customerLogin :Login)
  {
      return this.http.post<any>(this.url+"/getUser",customerLogin);
  }
  forgetPassword(email:String)
  {
    return this.http.get(this.url+"/forgetPassword/"+email)
  }
  validateOtp(otpForm:OtpForm)
  {
    return this.http.post(this.url+"/confirmOtp",otpForm);
  }
  updateUser(otpForm:OtpForm)
  {
    return this.http.put(this.url+"/updateForgetPasswordUser",otpForm);
  }
}
