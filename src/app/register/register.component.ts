import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from './register';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm :Register = {
      name:'',
      email:'',
    phoneNum:'',
    password:'',
    otp:'',

  }
  confirmPassword:String='';
  confirmOtp:boolean=false;
  errors: any={} ;
  errorOtp:string='';
 
  constructor(private service : RegisterService,private rout :Router) { }

  ngOnInit(): void {
  }

  onSubmit()
  {

    if(this.validateForm())
    {
        this.service.addUser(this.userForm).subscribe({
        next:(res)=>{
        console.log(res);
        if(res.status === "201")
        {
        this.rout.navigate(["/login"]);
        }
        else
        {
         this.errorOtp="Wrong Otp";
        }
        },
        error:(err)=>{
          console.log(err);
          
        }
       });
        
       
        
    }
       
  }

  sendOtp()
  {
    if(this.validateForm())
    {
      
       this.service.sendOtp(this.userForm.email).subscribe({
        next:(res)=>{
          console.log(res);
         
        },
        error:(err)=>{
          console.log(err);
          
        }
       });
      console.log(this.userForm.email);
      
      this.confirmOtp=true;
    }

  }

  validateForm():boolean {
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
    }else if(!this.isValidPassword(this.userForm.password))
    {
      this.errors.password = 'Password is should be like Krunal@123';
    }

    if(this.confirmPassword.trim()==='')
    {
      this.errors.confirmPassword = 'Confirm Password is required';
    }else if(this.confirmPassword.trim() !== this.userForm.password.trim())
    {
      this.errors.confirmPassword = 'Confirm Password is not matching';
    }
    if (this.userForm.otp.trim() === '' && this.confirmOtp!==false) {
      this.errors.otp = 'Otp is required';
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

}


