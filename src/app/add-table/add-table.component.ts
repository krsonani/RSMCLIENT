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
    quantity:0,
    capacity:0
  }
  constructor(private service : AddtableService) { }

  ngOnInit(): void {
  }
 
  onSubmit()
  {
    this.service.addTable(this.addTable).subscribe({
      next:(res)=>{
          console.log(res);
          
      },error:(err)=>{
        console.log(err);
        
      }
    });
  }


}
