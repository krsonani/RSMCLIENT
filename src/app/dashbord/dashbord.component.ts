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
  surplusUsers:any;
  activeTable:string[]=[];
  selectFoodItem:any;
  userid:string='';
  interval:any = '';

  constructor(private service : DashbordService,private rout : Router) {
    this.username = ''; // Replace with the logged-in user's name
  }

  receiveContent(content:string)
  {
    this.content=content;
    console.log(content);
  }
  receiveActiveTable(activeTable:string[])
  {
    this.activeTable=activeTable;
    console.log(activeTable);
  }



  logout() {
    sessionStorage.removeItem("jwtToken");
    this.rout.navigate(['/login'])
    console.log('Logged out successfully!');
  }

  ngOnInit(): void {

    this.interval = setInterval(()=>{
      this.validateJwtToken()
    },20000)
    this.service.getCustomer().subscribe({
      next:(res)=>{
        console.log(res);
        this.userid=res.uids;
        this.username=res.name;
        this.typeUser=res.role.type;
        console.log(this.typeUser);
        
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  goToViewTable()
  {
    this.content='viewtable';
  }

  validateJwtToken()
  {
    this.service.validateJwtToken().subscribe({
      next:(res)=>{console.log(res);
      },error:(err)=>{
        clearInterval(this.interval);
        this.logout();console.log(err);
      }
    })

    }

  


}
