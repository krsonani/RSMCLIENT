import { Component, OnInit } from '@angular/core';
import { Register } from './register';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: Register = {
    name: '',
    email: '',
    phoneNum: '',
    password: ''

  }
  confirmPassword: String = '';
  errors: any = {};

  constructor(private service: RegisterService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.validateForm()) {
      var res = this.service.addUser(this.userForm).subscribe();
      this.userForm = {
        name: '',
        email: '',
        phoneNum: '',
        password: '',
      }

      console.log(res);
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


