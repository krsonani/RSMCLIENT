import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashbordService } from './dashbord.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  id:number=-1;
  username: string;
  content:string='';
  typeUser:string='';
  noOfCustomer:number=4;
  surplusUsers:any;

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
        this.id=res.uids;
        this.username=res.name;
        this.typeUser=res.role.type;
        console.log(this.typeUser);
        
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  addToQueue()
  {
    this.content='viewtable';
    this.service.addtoQueue(this.id,this.noOfCustomer).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  


}
