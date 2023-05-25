import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

 tableItems:any[]=[];

  constructor(private service : TableService) { }

  ngOnInit(): void {
    
this.service.showTable().subscribe({
  next:(res)=>{
    console.log(res);
    this.tableItems=res;
  },
  error:(err)=>{
    console.log(err);
  }
});

  }

}
