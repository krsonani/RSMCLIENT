import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
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
  isOtpSubmitted:boolean=false;
  isOtpGenerated:boolean=false;

  error: any = {};
  confirmpass:string='';
  loginError: string = '';
  constructor(private service: LoginService, private root: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.coustomerLogin(this.loginForm).subscribe({
      next: (res) => {
        console.log(res);
        sessionStorage.setItem("jwtToken", "Bearer " + res.jwtToken);
        this.root.navigate(["/dashbord"])
      }, error: (err) => {
        console.log(err);
        this.loginError = "Invelid Credential"

      }
    });
  }


  onGetOtpClick() {
   if (this.isValidEmail(this.otpForm.email)) {
      this.service.forgetPassword(this.otpForm.email).subscribe({
        next: (res) => {
          console.log(res);
          this.isOtpGenerated=true;
        }, error: (err) => {
          console.log(err);
        }
      });
    }
    else {
      this.error.email = "Invalid Email";
    }
  }


  onEmailChange(str: string) {
    if (!this.isValidEmail(str)) {
      this.error.email = "Invalid Email";
    }
    else {
      this.error.email = "";
    }
  }
  onOtpChange(str: string) {
    if (!this.isValidOtp(str)) {
      this.error.otp = "OTP Format is not correct";
    }
    else {
      this.error.otp = "";
    }
  }
  onPasswordChange(str: string) {
    if (!this.isValidPassword(str)) {
      this.error.password = "Password should be in propper format";
    }
    else {
      this.error.password = "";
    }
  }

  onConfirmPasswordChange(str: string)
  {
    
    if (this.confirmpass.trim() === '') {
      this.error.confirmpass = 'Confirm Password is required';
    } else if (this.confirmpass.trim() !== this.otpForm.password.trim()) {
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
    this.otpForm.password="";
    this.confirmpass="";
    this.isOtpSubmitted=false;
    this.isOtpGenerated=false;
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
  otp: String = '';
  onOtpSubmit() {
    if (this.isValidOtp(this.otpForm.otp) && this.isValidEmail(this.otpForm.email)) {
      this.service.validateOtp(this.otpForm).subscribe({
        next: (res) => {
          console.log(res);
          this.isOtpSubmitted=true;
        }, error: (err) => {
          console.log(err);
        }
      });
    }
  }
  updateForgetPassUser() {
    this.service.updateUser(this.otpForm).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err) => {
        console.log(err);
      }
    });
  }
}
