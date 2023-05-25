import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:Login = {
    email:'',
    password:''
  }

  loginError:string='';
  constructor(private service : LoginService,private root :Router) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
       this.service.coustomerLogin(this.loginForm).subscribe({
        next:(res)=>{
             console.log(res);
             sessionStorage.setItem("jwtToken","Bearer "+res.jwtToken);
             this.root.navigate(["/dashbord"])    
        },error:(err)=>{
            console.log(err);
            this.loginError="Invelid Credential"
            
        }
       });
  }

}
