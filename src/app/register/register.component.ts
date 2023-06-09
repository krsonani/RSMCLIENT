import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AppService } from '../app/app.service';
import { Register } from './register';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() typeUser = '';
  @Output() content = new EventEmitter<string>();
  userForm: Register = {
    name: '',
    email: '',
    phoneNum: '',
    password: '',
    otp: '',

  }
  toggleToResend:boolean=false;
  confirmPassword: String = '';
  confirmOtp: boolean = false;
  errors: any = {};
  errorOtp: string = '';
  checkRegisterClick:boolean=false;

  constructor(private service: RegisterService, private rout: Router,private appservice:AppService) { }
  ngOnInit(): void {
    console.log(this.typeUser);
  }

  onSubmit() {
    this.checkRegisterClick=true;
    if (this.validateForm()) {
      if (this.typeUser === 'MANAGER') {
        this.service.addManager(this.userForm).subscribe({
          next:(res)=>{

            console.log(res);  
            this.clearForm();
            this.confirmPassword='';
            this.appservice.sweetAlertSuccess("Manager Added")
            this.content.emit("addManager")     
            
          },
          error:(err)=>{
            console.log(err);
            this.appservice.sweetAlertError("Email Already Exist");
            
          }
        });
      }
      else {
        this.service.addUser(this.userForm).subscribe({
          next: (res) => {
            console.log(res);
            this.appservice.sweetAlertSuccess("Registered");
            this.rout.navigate(["/login"]);
          },
          error: (err) => {
            console.log(err);
            this.appservice.sweetAlertError("Wrong Otp");

          }
        });
      }
    }
  }

    sendOtp()
    {
      if (this.validateForm()) {

        this.service.sendOtp(this.userForm.email).subscribe({
          next: (res) => {
            console.log(res);
            this.confirmOtp = true;
            this.appservice.sweetAlertSuccess("Otp Sent");
            this.changeToResend();
          },
          error: (err) => {
            console.log(err);
            this.appservice.sweetAlertError("Email Already Exist");
          }
        });
        console.log(this.userForm.email);

        
      }

    }

    validateForm(): boolean {
      this.errors = {};

      if (this.userForm.name.trim() === '') {
        this.errors.name = 'Name is required';
      }

      if (this.userForm.email.trim() === '') {
        this.errors.email = 'Email is required';
      } else if (!this.isValidEmail(this.userForm.email)) {
        this.errors.email = 'Invalid email format';
      }

      if (this.userForm.phoneNum.trim() === '') {
        this.errors.phoneNum = 'Phone number is required';
      } else if (!this.isValidPhoneNum(this.userForm.phoneNum)) {
        this.errors.phoneNum = 'Invalid phone number format';
      }

      if (this.userForm.password.trim() === '') {
        this.errors.password = 'Password is required';
      } else if (!this.isValidPassword(this.userForm.password)) {
        this.errors.password = 'Password is should be like Krunal@123';
      }

      if (this.confirmPassword.trim() === '') {
        this.errors.confirmPassword = 'Confirm Password is required';
      } else if (this.confirmPassword.trim() !== this.userForm.password.trim()) {
        this.errors.confirmPassword = 'Confirm Password is not matching';
      }
      if (this.userForm.otp.trim() === '' && this.confirmOtp !== false && this.checkRegisterClick) {
        this.errors.otp = 'Otp is required';
        this.checkRegisterClick=false;
      }

      if (Object.keys(this.errors).length === 0) {
        return true;
        console.log('Form is valid');
      }


      else
        return false;

    }

  private isValidEmail(email: string): boolean {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhoneNum(phoneNum: string): boolean {
    // Regular expression for phone number validation
    const phoneNumRegex = /^[0-9]{10}$/;
    return phoneNumRegex.test(phoneNum);
  }
  private isValidPassword(password: string): boolean {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
  clearForm() {
    this.userForm = {
      name: '',
      email: '',
      phoneNum: '',
      password: '',
      otp: '',
    };
  }
  navigateToLogin()
  {
    this.rout.navigate(["/login"]);
  }
  changeToResend()
  {
    this.toggleToResend=true;
  }
}


