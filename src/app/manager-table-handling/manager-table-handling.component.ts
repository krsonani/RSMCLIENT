import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManagerTableHandlerService } from './manager-table-handler.service';

@Component({
  selector: 'app-manager-table-handling',
  templateUrl: './manager-table-handling.component.html',
  styleUrls: ['./manager-table-handling.component.css']
})
export class ManagerTableHandlingComponent implements OnInit {

  listOfUsers:Map<any,any> = new Map();
  surplusUserList:any;

  constructor(private service:ManagerTableHandlerService) { }

  ngOnInit(): void {
    this.service.getSurplusUsers().subscribe({
      next:(res)=>{
        console.log(res);
        console.log(Object.keys(res));
        console.log(Object.values(res));
        
       // for(let result of Object.keys(res))
       for(let i=0;i<Object.keys(res).length || i<Object.values(res).length;i++)
        {
          this.service.getUsersById(Object.keys(res)[i]).subscribe(
            {next:(response)=>{
              console.log(response);
              this.listOfUsers.set(response,Object.values(res)[i]);
            },error:(err)=>{
              console.log(err);
            }
          }
          );
        }

        // {
          // this.service.getUsersById(result).subscribe(
          //   {next:(response)=>{
          //     console.log(response);
          //     this.listOfUsers.set(response,1);
          //   },error:(err)=>{
          //     console.log(err);
              
          //   }
          // }
          // );
        // }
        console.log(this.listOfUsers);
        
      },
      error:(err)=>
      {
        console.log(err);
        
      }
    });
  }
  

}
