import { Component, OnInit } from '@angular/core';
import { Addtable } from './addtable';
import { AddtableService } from './addtable.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent implements OnInit {

  addTable:Addtable={
    quantity:'',
    capacity:'2'
  }
  msg:string='';
  constructor(private service : AddtableService) { }

  ngOnInit(): void {
  }
 
  onSubmit()
  {
    this.service.addTable(this.addTable).subscribe({
      next:(res)=>{
          console.log(res);
          this.msg="Table added succesfully";
          this.addTable={
            quantity:'',
            capacity:'2'
          }
      },error:(err)=>{
        console.log(err);
        
      }
    });
  }


}
