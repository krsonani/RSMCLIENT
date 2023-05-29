import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
import Swal from 'sweetalert2';
import { AppComponent } from '../app.component';
import { AppService } from '../app/app.service';
import { Login } from './login';
import { LoginService } from './login.service';
import { OtpForm } from './otp-form';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: Login = {
    email: '',
    password: ''
  }
  otpForm: OtpForm = {
    name: 'boyplamber', email: '', phoneNum: '9876543210', password: '', otp: ''
  }
  isOtpSubmitted: boolean = false;
  isOtpGenerated: boolean = false;
  loginError:string='';
  error: any = {};
  confirmpass: string = '';
  msgOnModal: string = '';
  constructor(private service: LoginService, private route: Router,private appservice : AppService) { }

  ngOnInit(): void {
  }

  onSubmit() {
      if(this.loginForm.email.length==0){
      this.loginError='Email is required';
    }
    else if(this.loginForm.password.length==0)
    {
      this.loginError='Password is required';
    }
    else{
      this.service.coustomerLogin(this.loginForm).subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem("jwtToken", "Bearer " + res.jwtToken);
          this.route.navigate(["/dashbord"])
        }, error: (err) => {
          console.log(err);
        this.appservice.sweetAlertError("Invalid Credentidals");
        
        }
      });
    }
    
  }
  onSignUp()
  {
    this.route.navigate(["/register"])
  }

  onEmailChange(str: string):boolean {
    this.loginError="";
    if (str.length == 0){
      this.error.email = "Email is required"
      return false;
    }
    else if (!this.isValidEmail(str)) {
      this.error.email = "Invalid Email";
      return false;
    }
    else {
      this.error.email = "";
      return true;
    }
  }
  onOtpChange(str: string) {
    if (str.length == 0)
      this.error.otp = "Otp is required"
    else if (!this.isValidOtp(str)) {
      this.error.otp = "OTP Format is not correct";
    }
    else {
      this.error.otp = "";
    }
  }
  onPasswordChange(str: string):boolean {
    this.loginError="";
    if (str.length == 0){
      this.error.password = "password is required";
      return false;
    }
    
    else if (!this.isValidPassword(str)) {
      this.error.password = "Password should contain atleast @,numerics & alphabets";
      return false;
    }
    else {
      this.error.password = "";
      return true;
    }
  }

  onConfirmPasswordChange(str: string) {

    if (str.trim() === '') {
      this.error.confirmpass = 'Confirm Password is required';
    } else if (str.trim() !== this.otpForm.password.trim()) {
      this.error.confirmpass = 'Confirm Password is not matching';
    }
  }

  private isValidPassword(password: string): boolean {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  clearAll() {
    console.log("byee")
    this.error.email = "";
    this.error.otp = "";
    this.otpForm.email = "";
    this.otpForm.otp = "";
    this.otpForm.password = "";
    this.confirmpass = "";
    this.isOtpSubmitted = false;
    this.isOtpGenerated = false;
  }


  public isValidEmail(email: string): boolean {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  private isValidOtp(otp: string): boolean {
    // Regular expression for email validation
    const otpRegex = /^\d{6}$/gm;
    return otpRegex.test(otp);
  }

  onGetOtpClick() {
    if (this.isValidEmail(this.otpForm.email)) {
      this.service.forgetPassword(this.otpForm.email).subscribe({
        next: (res) => {
          console.log(res);
        this.appservice.sweetAlertSuccess("Otp Sent");
          this.isOtpGenerated = true;
        }, error: (err) => {
          console.log(err);
          this.appservice.sweetAlertError("User has not Registered!!");
        }
      });
    }
    else {
      this.error.email = "Invalid Email";
    }
  }



  otp: String = '';
  onOtpSubmit() {
    if (this.isValidOtp(this.otpForm.otp) && this.isValidEmail(this.otpForm.email)) {
      this.service.validateOtp(this.otpForm).subscribe({
        next: (res) => {
          console.log(res);
          this.isOtpSubmitted = true;
        }, error: (err) => {
          console.log(err);
          this.appservice.sweetAlertError("Otp was Incorrect");
        }
      });
    }
  }
  updateForgetPassUser() {
    this.service.updateUser(this.otpForm).subscribe({
      next: (res) => {
        console.log(res);
        this.appservice.sweetAlertSuccess("Password Changed");
      }, error: (err) => {
        console.log(err);
        this.appservice.sweetAlertError("Something went wrong");
      }
    });
  }


}
