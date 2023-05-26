import { ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,OnChanges {

 tableItems:any[]=[];
 tableIds:string[]=[];
  @Input() childInput: boolean=true;
  @Output() childOutput: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private service : TableService,private cdr : ChangeDetectorRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.showTable();
    this.tableIds=[];

  }
  childData: boolean=true;

  sendDataToParent() {
    this.childOutput.emit(this.childData);
  }

  ngOnInit(): void {
  this.showTable()
  }
  showTable()
  {
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
  addTableIds(id:string)
  {
    this.tableIds = [...this.tableIds,id]
    console.log(this.tableIds);
    
  }

  onToggle()
  {
    this.service.changeStatus(this.tableIds).subscribe({
      next:(res)=>{
            console.log(res);
            this.childData=!this.childInput;
            this.sendDataToParent();
      },error:(err)=>{
          console.log(err);
          
      }
    });
  }

}
