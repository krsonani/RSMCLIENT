import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashbordService } from './dashbord.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  username: string;
  content:string='';
  typeUser:string='';
  noOfCustomer:number=4;

  constructor(private service : DashbordService,private rout : Router) {
    this.username = ''; // Replace with the logged-in user's name
  }

  logout() {
    sessionStorage.removeItem("jwtToken");
    this.rout.navigate(['/login'])
    console.log('Logged out successfully!');
  }

  ngOnInit(): void {
    this.service.getCustomer().subscribe({
      next:(res)=>{
        console.log(res);
        this.username=res.name;
        this.typeUser=res.role.type;
        console.log(this.typeUser);
        
      },error:(err)=>{
        console.log(err);
      }
    })
  }


}
